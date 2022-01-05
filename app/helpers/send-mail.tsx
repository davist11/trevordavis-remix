import sgMail from '@sendgrid/mail'

interface MessageType {
    to: string
    from: string
    subject: string
    text: string
    html: string
}

export const sendMail = (msg: MessageType) => {
    // Otherwise await the send email request
    sgMail.setApiKey(process.env.SENDGRID_KEY)
    ;(async () => {
        try {
            await sgMail.send(msg)
        } catch (error) {
            console.error(error)

            if (error.response) {
                console.error(error.response.body)
            }
        }
    })()
}
