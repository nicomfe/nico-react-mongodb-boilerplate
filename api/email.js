const nodemailer = require('nodemailer')

const config = require('./config')

exports.sendEmail = (user) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: config.EMAIL_USER, // generated ethereal user
      pass: config.EMAIL_PASS, // generated ethereal password
    },
  })

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Smart creations 👻" <hi@smartcreations.co.nz>', // sender address
    to: user.email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Verify your account', // plain text body
    html: '<b>Please verify your account clicking on this link</b>', // html body
  }

  // send mail with defined transport object
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email', error)
    }
    console.log('Message sent to ', user.email, 'Message id', info.messageId)
  })
}
