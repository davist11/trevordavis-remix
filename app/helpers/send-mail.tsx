import client from '@sendinblue/client'

interface MessageType {
    to: any
    from: any
    replyTo: any
    subject: string
    text: string
    html: string
}

const sendRequest = (client: any, msg: MessageType) => {
    console.log('send request')
    return new Promise((resolve: Function, reject: Function) => {
        client
            .send(msg)
            .then(([response]: any) => {
                resolve(response)
                console.log(response)
            })
            .catch((error: any) => reject(error))
    })
}

export const sendMail = (msg: MessageType) => {
    const apiInstance = new client.TransactionalEmailsApi()

    apiInstance.setApiKey(
        client.TransactionalEmailsApiApiKeys.apiKey,
        process.env.SENDINBLUE_KEY
    )

    const sendSmtpEmail = new client.SendSmtpEmail()
    sendSmtpEmail.subject = msg.subject
    sendSmtpEmail.htmlContent = msg.html
    sendSmtpEmail.textContent = msg.text
    sendSmtpEmail.sender = msg.from
    sendSmtpEmail.to = [msg.to]
    sendSmtpEmail.replyTo = msg.replyTo

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
            console.log(
                'API called successfully. Returned data: ' +
                    JSON.stringify(data)
            )
        },
        function (error) {
            console.error(error)
        }
    )
}
