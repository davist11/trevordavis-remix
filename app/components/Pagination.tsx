import { Link } from 'remix'
import CaretDown from '~/images/icons/CaretDown'

const Pagination = ({
    currentPage,
    totalResults,
}: {
    currentPage: number
    totalResults: number
}) => {
    const prevPage = currentPage > 1 ? currentPage - 1 : null
    const prevPageUrl =
        prevPage && prevPage > 1 ? `/blog?page=${prevPage}` : '/blog'

    const totalPages = Math.ceil(totalResults / 10)
    const nextPage = currentPage < totalPages ? currentPage + 1 : null
    const nextPageUrl =
        nextPage && nextPage <= totalPages ? `/blog?page=${nextPage}` : null

    return (
        <div>
            <h2 className="sr-only">Pagination</h2>
            <ul className="flex w-full justify-end">
                {prevPage && prevPageUrl ? (
                    <li className="w-1/2 flex">
                        <Link
                            to={prevPageUrl}
                            className="flex items-center text-teal"
                        >
                            <CaretDown className="rect-icon transform rotate-90 mr-8" />
                            Previous
                            <span className="sr-only">Page</span>
                        </Link>
                    </li>
                ) : null}

                {nextPage && nextPageUrl ? (
                    <li className="w-1/2 flex justify-end">
                        <Link
                            to={nextPageUrl}
                            className="flex items-center text-teal"
                        >
                            Next
                            <span className="sr-only">Page</span>
                            <CaretDown className="rect-icon transform rotate-270 ml-8" />
                        </Link>
                    </li>
                ) : null}
            </ul>
        </div>
    )
}

export default Pagination
