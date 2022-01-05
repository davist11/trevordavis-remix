import sgMail from "@sendgrid/mail"

export const sendMail = (msg) => {
    // Otherwise await the send email request
    sgMail.setApiKey(process.env.SENDGRID_KEY);

    (async () => {
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }
    })();
}
