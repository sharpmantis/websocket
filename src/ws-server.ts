//ws-server : instanciation d'un server websocket

//import des packages necessaires
import * as express from 'express'; //framework nodeJS
import * as http from 'http'; //module serveur http
import * as WebSocket from 'ws'; //Module server websocket

//initialisation d'une nouvelle application express
const app = express();

//initialisation d'un server http (support de communication avec le client)
const server = http.createServer(app);

//initialise une instance websocket
const wss = new WebSocket.Server({ server });


//maintenant le code!!!
wss.on('connection', (ws: WebSocket) => {

    //la connection est ok, on envoie un simple message
    ws.on('message', (message: string) => {

        //affiche le message dans la console et le retourne au client
        console.log('recu: $s', message);
        ws.send(`Hello, vous venez d'envoyer -> ${message}`);
    });
    //envoie immédiatement une information au client connecté
    ws.send('salut, je suis dans le serveur WebSocket');

});

//Démarre le server
server.listen(process.env.PORT || 8999, () =>{
    console.log(`Le server est démarré sur le port ${server.address()} o/ YEAH!`);
});