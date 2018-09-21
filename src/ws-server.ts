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

    //données transmettre aux clients (les doubles accolades annoncent que c'est un 
    //objet vide de type JSON)
    let envelop: any = {};

    //la connection est ok, on envoie un simple message
    ws.on('message', (message: any) => {

        //affiche le message dans la console et le retourne au client
        console.log('recu: $s [%d]', message, new Date());
        envelop.message = 'Vous : ' + message ;
        //echo pour l'emmeteur
        ws.send(JSON.stringify(envelop));

        //broadcast vers les autres clients (sauf sois-meme)
        wss.clients
        .forEach(client => {
            if (client != ws){
                envelop.message = 'Utilisateur X: ' + message;
                client.send(JSON.stringify(envelop));
            }
        });
    });
    //envoie immédiatement une information au client connecté
    envelop.message = 'Bonjour, Bienvenue sur le tchat.';
    ws.send(JSON.stringify(envelop));

});

//Démarre le server
server.listen(process.env.PORT || 8999, () =>{
    console.log(`Le server est démarré sur le port ${server.address()} o/ YEAH!`);
});