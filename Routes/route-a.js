module.exports = app => {
    const route = require('../Controllers/activities');
  
    app.post('/private/ajouter-activity', route.create);
    
    app.get('/activities', route.findAll);
  
    app.get('/activity/:id', route.findOne);
  
    app.put('/private/update-activity', route.update);
  
    app.delete('/private/delete-activity', route.delete);
};