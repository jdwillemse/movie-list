require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3001;

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      throw new Error(`${bind} requires elevated privileges`);
    case 'EADDRINUSE':
      throw new Error(`${bind} is already in use`);
    default:
      throw error;
  }
}

// Why don't I need http createServer
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
app.on('error', onError);
