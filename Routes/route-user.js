module.exports = app => {
  const verified = require('../middleware/verifytoken')

  const yup = require('../Controllers/user');
  // const verified = require('../middleware/validation')


  app.get('/allUsers', verified, yup.findAll);

  app.get('/user/:id', verified, yup.findOne);

  app.put('/user/:id',  verified, yup.update);

  app.delete('/user/:id',verified, yup.delete);
};