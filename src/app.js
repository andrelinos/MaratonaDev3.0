import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';

const urlApp = 'src/index.html';
const urlAppDonors = 'src/donors.html';

const { Pool } = require('pg');

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

    // Banco de dados
    const db = new Pool({
      user: 'postgres',
      password: 'docker',
      host: 'localhost',
      port: '5432',
      database: 'donates',
    });

    this.server.use(
      express.urlencoded({
        extended: true,
      })
    );

    nunjucks.configure('./', {
      express: this.server,
      noCache: true,
    });

    this.server.get('/', (req, res) => {
      db.query('SELECT * FROM donors', (err, result) => {
        if (err) return res.send('Algo deu ruim.');

        const donors = result.rows;

        return res.render(urlApp, { donors });
      });
    });

    this.server.get('/donors', (req, res) => {
      db.query('SELECT * FROM donors', (err, result) => {
        if (err) return res.send('Algo deu ruim.');

        const donors = result.rows;

        return res.render(urlAppDonors, { donors });
      });
    });

    this.server.post('/', (req, res) => {
      const { item } = req.body;
      const { length } = req.body;
      const { width } = req.body;
      const { height } = req.body;
      const { situation } = req.body;
      const { description } = req.body;

      if (
        item === '' ||
        length === '' ||
        width === '' ||
        height === '' ||
        situation === '' ||
        description === ''
      ) {
        return res.send('Todos os campos precisam estar preenchidos.');
      }

      const query = `
        INSERT INTO donors (
          "item", "length", "width", "height", "situation", "description")
        VALUES ($1, $2, $3, $4, $5, $6)
      `;

      const values = [item, length, width, height, situation, description];

      // eslint-disable-next-line consistent-return
      db.query(query, values, err => {
        if (err) return res.send('Algo deu ruim.');
      });

      return res.redirect('/');
    });
  }
}
export default new App().server;
