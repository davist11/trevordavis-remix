import { Link } from 'remix'

const Pagination = ({ currentPage, totalResults }) => {
    const prevPage = currentPage > 1 ? currentPage - 1 : null
    const prevPageUrl = prevPage && prevPage > 1 ? `/blog?page=${prevPage}` : '/blog'

    const totalPages = Math.ceil(totalResults / 10)
    const nextPage = currentPage < totalPages ? currentPage + 1 : null
    const nextPageUrl = nextPage && nextPage <= totalPages ? `/blog?page=${nextPage}` : null

    return (
        <div>
            <h2 className="sr-only">Pagination</h2>
            <ul className="flex w-full justify-end">
                {prevPage && prevPageUrl ?
                    <li className="w-1/2 flex">
                        <Link to={prevPageUrl} className="flex items-center text-teal">
                            {/* {{ icon('caret-down', 24, 24, 'transform rotate-90 mr-8') }} */}

                            Previous
                            <span className="sr-only">Page</span>
                        </Link>
                    </li>
                : null }

                {nextPage && nextPageUrl ?
                    <li className="w-1/2 flex justify-end">
                        <Link to={nextPageUrl} className="flex items-center text-teal">
                            Next
                            <span className="sr-only">Page</span>

                            {/* {{ icon('caret-down', 24, 24, 'transform rotate-270 ml-8') }} */}
                        </Link>
                    </li>
                : null }
            </ul>
        </div>
    )
}

export default Pagination
