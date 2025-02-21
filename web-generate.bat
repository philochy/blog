set path=C:\Users\Administrator\AppData\Roaming\nvm\v20.13.0;%path%
set DB_NAME=%1%
set ORIGIN=%2%
set DOMIN=%3%
set NODE_ENV=prod
"C:\Users\Administrator\AppData\Roaming\nvm\v20.13.0\npm.cmd" run build
