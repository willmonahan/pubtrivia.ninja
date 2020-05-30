require('dotenv').config();
const PORT = process.env.PORT || 5200;
const isProd = process.env.environment == 'prod';
const key = process.env.key;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let links = {
  round1: '#',
  round2: '#',
  round3: '#',
  round4: '#',
  round5: '#',
};

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/homepage.html'))
});

app.get('/links', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/formlinks.html'))
});

app.post('/updatelinks', (req, res) => {
  if (req.query.key !== key) {
    return res.status(400).send('Unrecognized authorization key.');
  }

  links = { ...links, ...req.body };
  io.emit('links', links);
  res.send('Sucessfully updated links.');
})

server.listen(PORT, () => {
  console.log(`Listening at http://${isProd ? require('os').hostname() : 'localhost'}:${PORT}`);
});

io.on('connection', (sock) => {
  sock.emit('links', links);
});