
const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
const postRouter = require('./postRouter');

app.use('/blog-posts', postRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
