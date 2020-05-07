const multer = require('multer')

module.exports = app => {
  const yup = require('../Controllers/gites');

  app.post('/private/ajouter-gite', yup.create);
  
  app.get('/nos-gites', yup.findAll);
  // app.get('/nos-gites',
  // multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
  // 'photos'
  // ), yup.findAll);

  app.get('/private/nos-gites/:id', yup.findOne);

  app.put('/private/gite/:id', yup.update);

  app.delete('/private/gite/:id', yup.delete);
};