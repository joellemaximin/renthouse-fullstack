module.exports = app => {
  const yup = require('../Controllers/user');
  // const verified = require('../middleware/validation')


  app.get('/allUsers', yup.findAll);

  app.get('/private/user/:id', yup.findOne);

  //app.put('/private/user/:id', verified, yup.update);

  // app.delete('/private/user/:id',verified, yup.delete);
};