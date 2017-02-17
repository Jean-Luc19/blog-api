const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');
const content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`;

BlogPosts.create ('my first post', content, 'us');
BlogPosts.create ('my second post', content, 'guest author');

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

module.exports = router;
