const nodemailer = require('nodemailer')

const logger = require('./logger')

const config = require('./config')

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

exports.sendEmail = (user, next) => {
  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Smart creations 👻" <hi@smartcreations.co.nz>', // sender address
    to: user.email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Verify your account', // plain text body
    html: `<div>
      Please verify your account clicking on
      <a href="${config.APP_HOST_URL}/verifyAccount?email=${user.email}&token=${user.verifyEmailToken}">this link</a>
    </div>`, // html body
  }

  // send mail with defined transport object
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(`Error sending email. Details: ${error}`)
    }
    logger.info('Message sent to ', user.email, 'Message id', info.messageId)
    return info
  })
}

exports.sendRestPasswordLinkEmail = (_user, next) => {
  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Smart creations 👻" <hi@smartcreations.co.nz>', // sender address
    to: _user.email, // list of receivers
    subject: 'Reset your password ✔', // Subject line
    text: 'If you want to reset your password click this link', // plain text body
    html: `<div>
      If you want to reset your password click on
      <a href="${config.APP_HOST_URL}/resetPassword?email=${_user.email}&token=${_user.resetPasswordToken}">this link</a>
    </div>`, // html body
  }

  // send mail with defined transport object
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(`Error sending email. Details: ${error}`)
    }
    logger.info('Message sent to ', _user.email, 'Message id', info.messageId)
    return info
  })
}
