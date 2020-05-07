module.exports = app => {
    const yup = require('../Controllers/categories');
  
    app.post('/private/ajouter-categories', yup.create);
    
    app.get('/categories', yup.findAll);
  
    app.get('/categories/:id', yup.findOne);
  
    app.put('/private/categorie/:id', yup.update);
  
  };