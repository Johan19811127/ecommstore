// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const mongoose = require('mongoose');
const Message = require('./models/Message');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', async (data) => {
      const { sender, recipient, content } = data;

      const message = new Message({ sender, recipient, content });
      await message.save();

      io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
