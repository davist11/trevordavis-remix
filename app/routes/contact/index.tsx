import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { AkismetClient } from 'akismet-api'

import useMetaData from '~/hooks/use-meta-data'
import useSendMail from '~/hooks/use-send-mail'

import CurvedArrow from '~/images/icons/CurvedArrow'
import Loader from '~/components/Loader'
import PageHeading from '~/components/PageHeading'
import Divider from '~/components/Divider'

export const meta = () => {
    return useMetaData({
        title: 'Contact',
        description: 'Get in touch with me!',
    })
}

interface ErrorsType {
    honeypot?: string
    name?: string
    email?: string
    message?: string
    general?: string
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

    const key = process.env.AKISMET_KEY
    const blog = 'trevor-davis.com'
    const client = new AkismetClient({ key, blog })
    const ip = request.headers.get('x-forwarded-for')

    const comment = {
        ip: ip,
        content: message,
        email: email,
        name: name,
    }

    try {
        const isValid = await client.verifyKey()

        if (!isValid) {
            errors.general =
                'Sorry, there was an error on our end, try again soon.'
        } else {
            const isSpam = await client.checkSpam(comment)

            if (isSpam) {
                errors.general =
                    'Sorry, there was an error on our end, try again soon.'
            }
        }
    } catch (err: any) {
        console.error('Could not reach Akismet:', err.message)
        errors.general = 'Sorry, there was an error on our end, try again soon.'
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
        to: process.env.MAIL_TO ?? '',
        from: process.env.MAIL_FROM ?? '',
        replyTo: email,
        subject: 'New Contact Form Submission',
        text: textMessage,
        html: htmlMessage,
    }

    await useSendMail(msg)

    return redirect('/contact/thanks')
}

export default function ContactIndex() {
    const errors = useActionData()
    const transition = useTransition()
    const curvedArrowIcon = (
        <CurvedArrow className="rect-icon absolute transform rotate-100 -left-8" />
    )

    return (
        <div className="max-w-768 mx-auto px-20">
            <div className="relative pb-48 mb-48">
                <PageHeading>Contact</PageHeading>

                <Divider />
            </div>

            <Form method="post">
                {errors?.honeypot ? <div>{errors.honeypot}</div> : null}
                {errors?.general ? <div>{errors.general}</div> : null}

                <ol className="forms">
                    <li className="sr-only">
                        <label htmlFor="important">Leave this blank</label>
                        <input type="text" name="important" id="important" />
                    </li>

                    <li className="field">
                        <label htmlFor="name" className="font-medium relative">
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
                        <label htmlFor="email" className="font-medium relative">
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
                        <label
                            htmlFor="message"
                            className="font-medium relative"
                        >
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

                    <li className="flex justify-end">
                        {transition.state === 'submitting' ? (
                            <div className="relative w-64 mr-32">
                                <Loader />
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            className="bg-blue-200 border-2 border-blue-200 text-blue-400 leading-none py-10 px-20 rounded-md antialiased font-medium transition-all duration-200 hover:bg-blue-400 hover:text-blue-100 hover:rounded-xl"
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
