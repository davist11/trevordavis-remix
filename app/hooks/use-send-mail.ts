import mail from '@sendgrid/mail'

interface MessageType {
    to: string
    from: string
    subject: string
    text: string
    html: string
}

export default async function useSendMail(msg: MessageType) {
    mail.setApiKey(process.env.SENDGRID_KEY ?? '')

    try {
        await mail.send(msg)
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
