module.exports = app => {
  const booking = require('../Controllers/booking');
  
  app.get('/bookings', booking.findAll);

  app.get('/booking/:id', booking.findOne);

  app.put('/booking/:id', booking.update);

  app.delete('/booking/:id', booking.delete);

  app.get('/bookings-oldest', booking.lastBookings);

  app.delete('/booking/:id', booking.delete);

};