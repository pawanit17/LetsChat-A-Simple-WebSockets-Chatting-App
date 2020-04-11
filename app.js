const http = require('http');
const fs = require("fs");
const websocket = require('ws');

// Create the HTTP server.
const server = http.createServer( (req, res)=>{
    console.log( req.url);

    // Configure the routes and the files to display for the same.
    if( req.url == "/" || req.url == "/index.html" || req.url == "/js/chatscript.js" || req.url == "/favicon.ico" ){
        
        if( req.url == "/" )
            resource = "index.html";
        else
            resource = req.url.substring( 1 );
        
        console.log( resource );

        fs.readFile(resource, function(err, data){
            if(!err){
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
            else{
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write("<h2>The script file could not be loaded</h2>");
                res.end();
            }
        });
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write("<h2>The resource does not exist</h2>");
        res.end();  
    }
});

// Instantiate a WebSocket server. This needs the HTTP server created earlier. 
// The WebSocket server would listen to the HTTP traffic to see if there is
// any WS traffic coming from the client.
const wss = new websocket.Server({ server } )

//  A collection of Game Of Thrones dialogues captured from here: https://mashable.com/article/best-game-of-thrones-one-liners/
// For this example, intention is to have this to serve as the server response message for any user message.
var gameOfThronesDialogs = [
    "The man who passes the sentence should swing the sword. — Ned Stark",
    "The things I do for love. — Jaime Lannister",
    "I have a tender spot in my heart for cripples, bastards and broken things. — Tyrion",
    "When you play the game of thrones, you win or you die. — Cersei",
    "I grew up with soldiers. I learned how to die a long time ago. — Ned Stark",
    "Never forget what you are. The rest of the world will not. Wear it like armour, and it can never be used to hurt you. — Tyrion",
    "Everyone is mine to torment. — Joffrey",
    "The day will come when you think you are safe and happy, and your joy will turn to ashes in your mouth. — Tyrion",
    "The night is dark and full of terrors. — Melisandre",
    "You know nothing, Jon Snow. — Ygritte",
    "Night gathers, and now my watch begins — Various members of the Night's Watch",
    "A Lannister always pays his debts. — Various Lannisters",
    "Burn them all! — Aerys II Targaryen",
    "What do we say to the God of death? — Syrio Forel",
    "There's no cure for being a fool. — Bronn",
    "I've seen wet shits I like better than Walder Frey. — Brynden Tully",
    "Winter is coming — Pretty much everyone",
    "That's what I do: I drink and I know things. — Tyrion",
    "I am the dragon's daughter, and I swear to you that those who would harm you will die screaming. — Daenerys",
    "A lion does not concern himself with the opinion of sheep. — Tywin",
    "Chaos isn't a pit. Chaos is a ladder. — Littlefinger",
    "Power resides where men believe it resides. It's a trick; a shadow on the wall. — Varys",
    "If you think this has a happy ending, you haven't been paying attention. — Ramsay",
    "I would let myself be consumed by maggots before mocking the family name and making you heir to Casterly Rock. — Tywin",
    "If you ever call me sister again, I'll have you strangled in your sleep. — Cersei",
    "A girl is Arya Stark of Winterfell. And I'm going home. — Arya",
    "Any man who must say 'I am the King' is no true King. — Tywin",
    "Oh, monster? Perhaps you should speak to me more softly then. Monsters are dangerous and just now Kings are dying like flies. — Tyrion",
    "Jaime... my name's Jaime. — Jaime",
    "I am your son. I have always been your son. — Tyrion",
    "I read it in a book. — Samwell Tarly",
    "If I fall, don't bring me back. — Jon Snow",
    "The big fish eat the little fish and I keep on paddling. — Varys",
    "Lannister, Targaryen, Baratheon, Stark, Tyrell... they're all just spokes on a wheel. This one's on top, then that one's on top, and on and on it spins, crushing those on the ground. — Daenerys",
    "Hold the door! — Wylis/Hodor",
    "I don't plan on knitting by the fire while men fight for me. — Lyanna Mormont",
    "When people ask you what happened here, tell them the North remembers. Tell them winter came for House Frey. — Arya",
    "He really was an idiot, wasn't he? — Lady Olenna",
    "Nothing screws you harder than time. — Davos Seaworth",
    "There is only one war that matters. The Great War. And it is here. — Jon Snow"
];

// Connection is an event that is emitted on the WebSocket server
// when a client connects to it successfully.
wss.on('connection', (socket, request)=>{
    console.log('Server: WebScoket request accepted');
    
    // Sending a message to the client through the created socket.
    socket.send( 'Welcome to the chat!.' );

    // Message is an event that is emitted on the Socket object
    // whenever there is a message from the client.
    socket.on('message', (data)=>{
        console.log('Received from the client' + data);

        // Get a random number between 0 and 40 and send the correspnding entry from
        // 'gameOfThronesDialogs' array created above.
        socket.send( gameOfThronesDialogs[Math.floor((Math.random() * 39) + 1)] );
    })
})

// Let this HTTP server listen to all traffic on port 8000.
server.listen(8000);
