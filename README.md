# websocket

serveur websocket nodeJS+express

cd websocket
in order to install:

npm init
npm i ws express

check typescript âckage is already installed
npm list typescript

if not
npm: typescript -g

install express and note @type
npm i @types/ws @types/express -D

you are ready to code :)

A chaque changements sur le serveur, il faut le compiler:
.node_modules/.bin/tsc

Pour déparrer le serveur:
node ./dist/server/ws-server