module.exports = app => {
  const yup = require('../Controllers/auth');

  app.post('/login', yup.login);

  app.post('/register', yup.register);

  app.get('/allUsers', yup.findAll);

  app.get('/private/user/:id', yup.findOne);

//   app.put('/private/user/:id', yup.update);

//   app.delete('/private/user/:id', yup.delete);
};