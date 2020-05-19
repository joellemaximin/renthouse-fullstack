module.exports = app => {
    // const verified = require('../middleware/verifytoken')
  
    const msg = require('../Controllers/user');
    // const verified = require('../middleware/validation')
  
  
    app.get('/all-messages', verified, msg.findAll);
  
    app.get('/message/:id', verified, msg.findOne);
    
    app.delete('/message/:id',verified, msg.delete);
};