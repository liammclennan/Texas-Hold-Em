@@echo off

if "%~1" == "compile" goto compile
if "%~1" == "run" goto run

echo "bake compile something.coffee"
echo "bake run something.js"
goto :end

:compile
mkdir output
coffeedir
goto :end

:run
jsrun .\output\texas.js

:end
