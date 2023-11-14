const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ingecarrasquilla@gmail.com',
        pass: '',
    },
});


const emailService = {
    sendConfirmationEmail: async (to, subject, text) => {
        const correoOptions = {
            from: 'ingecarrasquilla@gmail.com', 
            to,
            subject,
            text,
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(correoOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    console.log('Correo electrónico enviado: ' + info.response);
                    resolve(info);
                }
            });
        });
    },
};

module.exports = emailService;