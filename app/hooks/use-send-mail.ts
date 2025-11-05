import Mailgun from 'mailgun.js'

interface MessageType {
    to: string
    from: string
    subject: string
    text: string
    html: string
}

export default async function useSendMail(msg: MessageType, formData: any) {
    const mailgun = new Mailgun(formData)
    const mg = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY ?? '',
    })

    try {
        await mg.messages.create('trevor-davis.com', {
            to: msg.to,
            from: msg.from,
            subject: msg.subject,
            text: msg.text,
            html: msg.html,
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent.' }),
        }
    } catch (error: any) {
        console.log(error.response.body.errors)

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending email.' }),
        }
    }
}
