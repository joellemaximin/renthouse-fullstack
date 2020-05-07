module.exports = app => {
    const yup = require('../Controllers/booking');
  
    app.post('/booking', yup.create);
    
    //private setlist bookings
    app.get('/bookings', yup.findAll);
  
    app.get('/booking/:id', yup.findOne);
  
    app.put('/booking/:id', yup.update);
  
    app.delete('/booking/:id', yup.delete);
};