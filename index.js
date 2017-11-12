const nodemailer = require('nodemailer');
const config = require('./config.json');
const csv = require('csvtojson');

let transporter = nodemailer.createTransport(config);

csv().fromFile(csvFilePath).on('json', 'utf8', (person) => {
  fs.readFile('template.html', (err, content) => {
    let mailOptions = {
      from: '"BoilerMake Team" <psivabal@purdue.edu>',
      to: person.first,
      subject: 'BoilerMake Exec Team Interview',
      html: content
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if(error) return console.log(error);
      console.log('Message sent: ' + info.response);
    });
})
.on('done',(error)=>{
    if(error) console.log(error);
});
