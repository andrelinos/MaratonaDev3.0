import express from 'express';

import nunjucks from 'nunjucks';

const page = express();

export default nunjucks.configure('./', {
  express: page,
});
