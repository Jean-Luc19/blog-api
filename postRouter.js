const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');
const content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`;

BlogPosts.create ('my first post', content, 'us');
BlogPosts.create ('my second post', content, 'guest author');

router.get('/', (req, res) => {
  return res.json(BlogPosts.get());
});

router.get('/:id', (req, res) => {
  const post = BlogPosts.get(req.params.id)
  if (!post) {
    return res.sendStatus(404);
  }
  return res.json(post);
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++){
    const field = requiredFields[i];
    if (!(field in req.body)){
      const message = `The ${field} field is missing from your submission.`
      console.error(message);
      return res.status(400).send(message);
    };
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    return res.status(201).json(item);
  }
});

router.delete('/:id', (req, res) => {
  if (!BlogPosts.get(req.params.id)) {
    return res.sendStatus(404);
  }
  BlogPosts.delete(req.params.id);
  return res.sendStatus(200);
});

router.put('/:id', jsonParser, (req, res) => {
  if (req.params.id !== req.body.id){
    return res.sendStatus(400);
  }
  const updatedObject = req.body;
  BlogPosts.update(updatedObject);
  return res.sendStatus(200);


});

module.exports = router;
