import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';

const urlApp = 'src/index.html';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(
      '/',
      express.static(path.resolve(__dirname, '..', 'src', 'public'))
    );

    nunjucks.configure('./', {
      express: this.server,
    });

    this.server.get('/', (req, res) => {
      return res.render(urlApp);
    });
  }
}
export default new App().server;
