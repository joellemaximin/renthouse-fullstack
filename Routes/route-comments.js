module.exports = app => {
  const comment = require('../Controllers/comments');

  app.post('/private/create-comment', comment.create);
  
  app.get('/comments', comment.findAll);//public

  app.get('/private/comment/:id', comment.findOne);

  app.put('/private/comment/:id', comment.update);

  app.delete('/private/comment/:id', comment.delete);
};