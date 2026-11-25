@echo off
rem Ouvre EGRADI TV sur cet ordinateur (les vidéos YouTube ne marchent pas en double-cliquant sur index.html).
cd /d "%~dp0"
start "" http://localhost:8795/
python -m http.server 8795
