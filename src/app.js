import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';

let ="";

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
      return res.render('index.html');
    });
  }
}
export default new App().server;
