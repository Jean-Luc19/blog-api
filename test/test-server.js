const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
// this lets us use *should* style syntax in our tests
// so we can do things like `(1 + 1).should.equal(2);`
// http://chaijs.com/api/bdd/
const should = chai.should();

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('Suite of test for the post API layer', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('get should return a list of posts', function() {
    chai.request(app)
    .get('/blog-posts')
    .then(function(res) {
      res.body.should.be.a('array');
      res.body[0].title.should.be.equal('my first post');
      res.body.length.should.be.equal(2);
    });
  });
  it('should check all the content for posts', function() {
    chai.request(app)
    .get('/blog-posts')
    .then(function(res) {
      const myID = res.body[0].id;
      chai.request(app)
      .get(`/blog-posts/${myID}`)
      .then(function(res) {
        res.body.should.be.a('object');
        res.body.title.should.be.a('string');
        res.body.content.should.be.a('string');
        res.body.author.should.be.a('string');
      });
    });
  });
   
  it('should check to see that a new post was added', function() {
    const newPost = {title: 'new post', content: 'content', author: 'new author'};
    chai.request(app)
    .post('/blog-posts')
    .send(newPost)
    .then(function(res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('title', 'content', 'author');
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newPost, {id: res.body.id}));
    });
  });
});
