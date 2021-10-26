import nodemailer from 'nodemailer';

const TRANSPORTER_HOST = process.env.TRANSPORTER_HOST;
const COMPANY_EMAIL = process.env.COMPANY_EMAIL;
const COMPANY_EMAIL_PASS = process.env.COMPANY_EMAIL_PASS;

export const main = async (recipient: string, letter: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: TRANSPORTER_HOST,
            service: "yandex",
            port: 465,
            secure: true, 
            auth: {
              user: 'fixatornote@yandex.ru',
              pass: 'cj489gwhAN9ss@'
            }
        });

        let info = await transporter.sendMail({
            from: `Fixator <${COMPANY_EMAIL}>`,
            to: recipient, 
            subject: "Confirmation", 
            text: letter
        });

        return { messageId: info.messageId }
    } catch (error) {
        console.log(error);
    }
}