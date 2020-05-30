// configure .env file, including port number, environment, and API key
require('dotenv').config();
const PORT = process.env.PORT || 5200;
const isProd = process.env.environment == 'prod';
const key = process.env.key;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// create express app, and expose the socket.io endpoint too
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// this is just our in-memory store of the links for each round
let links = {
  round1: '#',
  round2: '#',
  round3: '#',
  round4: '#',
  round5: '#',
};

// we serve static files at the /static route
app.use('/static', express.static(path.join(__dirname, 'static')));
// this lets us parse the bodies of incoming post requests
app.use(bodyParser.urlencoded({ extended: true }));

// these 2 handles send the appropriate pages for the / and /links routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/homepage.html'))
});

app.get('/links', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/formlinks.html'))
});

// this endpoint is the one that gets hit in order to update all the links
// we have to hit it with the correct API key for it to work
// currently, this is being hit via Apps Script functions
app.post('/updatelinks', (req, res) => {
  // if the api key doesn't match, send back and error and abandon this callback function
  if (req.query.key !== key) {
    return res.status(400).send('Unrecognized authorization key.');
  }

  // we include the new links (including blanks) in our in-memory store "links" variable
  links = { ...links, ...req.body };
  io.emit('links', links); // broadcast the new links out to ALL io clients
  res.send('Sucessfully updated links.');
})

server.listen(PORT, () => {
  console.log(`Listening at http://${isProd ? require('os').hostname() : 'localhost'}:${PORT}`);
});

// when a socket connects for the very first time, we send it the links as we have them in memory
io.on('connection', (sock) => {
  sock.emit('links', links);
});