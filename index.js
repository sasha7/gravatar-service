const http = require('http');
const logger = require('morgan');
const util = require('util');
const log = require('debug')('gravatar-service:log');

const crypto = require('crypto');

const PORT = 3001;
const HOST = 'http://localhost';

const server = http.createServer();

logger('combined');

server.on('request', (req, res) => {
  const email = req.url.substr(req.url.lastIndexOf('/') + 1);
  log('EMAIL: ', util.inspect(req.url));
  log('EMAIL: ', email);

  if(!email) {
    res.writeHead(404);
    return res.end();
  }

  const hash = crypto.createHash('md5').update(email).digest('hex');
  const url = `http://www.gravatar.com/avatar/${hash}`;

  log('URL', url);

  http.get(url, (response) => {
    response.pipe(res);
  });
});

server.listen(PORT, () => {
  log(`Listening on ${HOST}:${PORT}`);
});
