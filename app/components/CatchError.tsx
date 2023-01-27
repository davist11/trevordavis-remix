import { Link } from "@remix-run/react";
import Divider from './Divider'
import PageHeading from './PageHeading'

const CatchError = ({ errorText }: { errorText: string }) => {
    return (
        <div className="max-w-768 mx-auto px-20 min-h-2/3-screen">
            <div className="relative pb-48 mb-48">
                <PageHeading>{errorText}</PageHeading>

                <Divider />
            </div>

            <div className="text">
                <p>
                    Sorry about the page being broken. You can{' '}
                    <Link to="/contact">contact me</Link> to let me know what I
                    broke.
                </p>
            </div>
        </div>
    )
}

export default CatchError
