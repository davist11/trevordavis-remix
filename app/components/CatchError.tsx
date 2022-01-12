import { Link } from 'remix'

const CatchError = ({ errorText }: { errorText: string }) => {
    return (
        <div className="max-w-768 mx-auto px-20 min-h-2/3-screen">
            <div className="relative pb-48 mb-48">
                <h1 className="text-jb text-purple">{errorText}</h1>

                <div className="absolute left-0 bottom-0 h-2 w-120 bg-blue-600"></div>
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
