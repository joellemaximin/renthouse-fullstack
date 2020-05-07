module.exports = app => {
    const yup = require('../Controllers/equipments');
  
    app.post('/private/equipement', yup.create);
    
    app.get('/equipements', yup.findAll);
  
    app.get('/private/equipement/:id', yup.findOne);
  
    app.put('/private/equipement/:id', yup.update);
  
  };