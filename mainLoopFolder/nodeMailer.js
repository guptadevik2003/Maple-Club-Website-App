const nodemailer = require('nodemailer')

module.exports.sendMail = async ({ fromName, fromEmail, toName, toEmail, subject, text, html }) => {

    await nodemailer.createTestAccount()

    let transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
        tls: {
            rejectUnauthorized: false
        },
    })

    let mailOptions = {
        from: `${fromName} <${fromEmail}>`,
        to: `${toName} <${toEmail}>`,
        subject: `${subject}`,
        text: `${text}`,
        html: `${html}`,
    }

    let mailSentInfo = await transporter.sendMail(mailOptions)

    return mailSentInfo

}
