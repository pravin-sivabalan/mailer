const nodemailer = require('nodemailer');
const fs = require('fs');
const csv = require('csvtojson');
const config = require('./config.json');

const csvFilePath = process.argv[2];

let transporter = nodemailer.createTransport(config);

// csv header format first, last, email, url
csv().fromFile(csvFilePath).on('json', (person) => {
  fs.readFile('template.html', 'utf8', (err, content) => {

    const link = 'http://interview.boilermake.org/invite' + person.url.substring(person.url.lastIndexOf('/'));
    content = content.replace('#{name}', person.first);
    content = content.replace('#{link}', link);
    content = content.replace('#{link}', link);

    let mailOptions = {
      from: '"BoilerMake Team" <psivabal@purdue.edu>',
      to: person.email,
      subject: 'BoilerMake Exec Team Interview',
      html: content
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if(error) return console.log(error);
      console.log('Message sent to: ' + person.first + ' ' + person.last);
    });

  });
})
.on('done', (error) => {
    if(error) console.log(error);
});
