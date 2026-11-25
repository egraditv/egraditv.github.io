# Exporte les icônes PNG de l'application à partir de logo.svg (rendu par Microsoft Edge, sans rien installer).
#   powershell -ExecutionPolicy Bypass -File outils\exporter_icones.ps1
$ErrorActionPreference = "Continue"  # Edge écrit ses messages sur stderr
$racine = Split-Path -Parent $PSScriptRoot
$edge = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
$tmp = Join-Path $env:TEMP "egradi-icones"
New-Item -ItemType Directory -Force $tmp | Out-Null
$svg = (Resolve-Path (Join-Path $racine "logo.svg")).Path -replace '\\', '/'

function Exporter($nom, $taille, $fond, $echelle) {
  $html = Join-Path $tmp "$nom.html"
  $img = [int]($taille * $echelle)
  @"
<!doctype html><html><body style="margin:0;width:${taille}px;height:${taille}px;display:grid;place-items:center;background:$fond">
<img src="file:///$svg" width="$img" height="$img"></body></html>
"@ | Set-Content -Encoding utf8 $html
  $sortie = Join-Path $racine $nom
  & $edge --headless=new --disable-gpu --hide-scrollbars --default-background-color=00000000 `
    "--screenshot=$sortie" "--window-size=$taille,$taille" "file:///$($html -replace '\\','/')" 2>&1 | Out-Null
  Start-Sleep -Milliseconds 300
  Write-Output "$nom : $((Get-Item $sortie).Length) octets"
}

Exporter "logo-512.png" 512 "transparent" 1
Exporter "logo-192.png" 192 "transparent" 1
Exporter "logo-maskable-512.png" 512 "#0a1022" 0.8
Exporter "apple-touch-icon.png" 180 "#0a1022" 0.92
