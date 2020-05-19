const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport');
const config = require('./config-mailgun')

const auth = {
  auth: {
    api_key: config.API_KEY,
    domain: config.DOMAIN,
  },
  // proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}
  

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const sendMail = (email, subject, text, cb) => {
  nodemailerMailgun.sendMail({
    from: email,
    to: 'melaniedayshow@gmail.com', 
    //   cc:'second@domain.com',
    //   bcc:'secretagent@company.gov',
    subject: subject,
    //   'h:Reply-To': 'reply2this@company.com',
    //You can use "html:" to send HTML email content. It's magic!
    //   html: '<b>Wow Big powerful letters</b>',
    //You can use "text:" to send plain-text content. It's oldschool!
    text: text,
  }, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
    else {
      console.log(`Response: ${info}`);
    }
  });
}

module.exports = sendMail;

