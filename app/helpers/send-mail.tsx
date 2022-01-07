import client from '@sendgrid/mail'

interface MessageType {
    to: string
    from: string
    subject: string
    text: string
    html: string
}

const sendRequest = (client: any, msg: MessageType) => {
    return new Promise((resolve: Function, reject: Function) => {
        client
            .send(msg)
            .then(([response]: any) => {
                resolve(response)
            })
            .catch((error: any) => reject(error))
    })
}

export const sendMail = async (msg: MessageType) => {
    // Otherwise await the send email request
    client.setApiKey(process.env.SENDGRID_KEY)

    sendRequest(client, msg)
}
