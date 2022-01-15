import {
    useActionData,
    Form,
    redirect,
    json,
    useTransition,
    useLoaderData,
} from 'remix'
import { sendMail } from '~/helpers/send-mail.server'
import Loader from '~/components/Loader'
import { getMeta } from '~/helpers/get-meta'
import CurvedArrow from '~/images/icons/CurvedArrow'
import ReCAPTCHA from 'react-google-recaptcha'
import { useState } from 'react'
import type { FormEvent } from 'react'

export const meta = () => {
    return getMeta({
        title: 'Contact',
        description: 'Get in touch with me!',
    })
}

interface ErrorsType {
    honeypot?: string
    name?: string
    email?: string
    message?: string
}

export const loader = () => {
    return json({ siteKey: process.env.RECAPTCHA_SITE_KEY })
}

export async function action({ request }: any) {
    const formData = await request.formData()
    const honeypot = formData.get('important')
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    const errors: ErrorsType = {}

    if (honeypot) {
        errors.honeypot = 'This is not a valid submission'
    }

    if (!name) {
        errors.name = 'Name is required'
    }

    if (!email) {
        errors.email = 'Email is required'
    }

    if (!message) {
        errors.message = 'Message is required'
    }

    if (Object.keys(errors).length) {
        return json(errors, { status: 422 })
    }

    const textMessage = `
        Name: ${name}\n
        Email: ${email}\n\n
        ${message}`

    const htmlMessage = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <p>${message}</p>`

    const msg = {
        to: process.env.MAIL_TO,
        from: process.env.MAIL_FROM,
        replyTo: email,
        subject: 'New Contact Form Submission',
        text: textMessage,
        html: htmlMessage,
    }

    await sendMail(msg)

    return redirect('/contact/thanks')
}

export default function ContactIndex() {
    const [isCaptchaValid, setIsCaptchaValid] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const errors = useActionData()
    const transition = useTransition()
    const data = useLoaderData()
    const curvedArrowIcon = (
        <CurvedArrow className="rect-icon absolute transform rotate-100 -left-8" />
    )

    const handleChange = () => {
        setIsCaptchaValid(true)
    }

    const handleSubmit = (e: FormEvent) => {
        setIsSubmitted(true)

        if (!isCaptchaValid) e.preventDefault()
    }

    return (
        <div className="max-w-768 mx-auto px-20">
            <div className="relative pb-48 mb-48">
                <h1 className="text-jb text-yellow">Contact</h1>

                <div className="absolute left-0 bottom-0 h-2 w-120 bg-blue-600"></div>
            </div>

            <Form method="post" onSubmit={handleSubmit}>
                {errors?.honeypot ? <div>{errors.honeypot}</div> : null}

                <ol className="forms">
                    <li className="sr-only">
                        <label htmlFor="important">Leave this blank</label>
                        <input type="text" name="important" id="important" />
                    </li>

                    <li className="field">
                        <label htmlFor="name" className="relative">
                            Name
                            <span className="sr-only">Required</span>
                            {curvedArrowIcon}
                        </label>
                        <div className="ml-16">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="name"
                                required
                            />
                            {errors?.name ? <div>{errors.name}</div> : null}
                        </div>
                    </li>

                    <li className="field">
                        <label htmlFor="email" className="relative">
                            Email
                            <span className="sr-only">Required</span>
                            {curvedArrowIcon}
                        </label>
                        <div className="ml-16">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="email"
                                required
                            />
                            {errors?.email ? <div>{errors.email}</div> : null}
                        </div>
                    </li>

                    <li className="field">
                        <label htmlFor="message" className="relative">
                            Message
                            <span className="sr-only">Required</span>
                            {curvedArrowIcon}
                        </label>
                        <div className="ml-16">
                            <textarea
                                name="message"
                                id="message"
                                required
                            ></textarea>
                            {errors?.message ? (
                                <div>{errors.message}</div>
                            ) : null}
                        </div>
                    </li>

                    <li className="field">
                        <div className="ml-16">
                            <ReCAPTCHA
                                sitekey={data.siteKey}
                                theme="dark"
                                onChange={handleChange}
                            />
                            {isSubmitted && !isCaptchaValid ? (
                                <div>This captcha is required</div>
                            ) : null}
                        </div>
                    </li>

                    <li className="flex justify-end">
                        {transition.state === 'submitting' ? (
                            <div className="relative w-64 mr-32">
                                <Loader />
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            className="bg-yellow text-blue-400 px-32 py-16 rounded-full transition-default duration-200 hover:bg-orange"
                            data-form-target="button"
                        >
                            Send
                        </button>
                    </li>
                </ol>
            </Form>
        </div>
    )
}
