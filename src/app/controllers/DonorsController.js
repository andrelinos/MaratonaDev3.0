import '../../config/nunjucksConfig';

class DonorsControler {
  async index(req, res) {
    return res.render('index.html');
  }
}

export default new DonorsControler();
