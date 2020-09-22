import React from 'react';
import { Link } from 'react-router-dom';
const pagination = ({paginationParams}) => {
    const ITEMS_PER_PAGE = paginationParams.pageSize;
    const currentPage = paginationParams.pageIndex;
    const previousPage = paginationParams.pageIndex - 1;
    const hasNextPage = (paginationParams.pageIndex * ITEMS_PER_PAGE) < paginationParams.count;
    const hasPreviousPage = paginationParams.pageIndex > 1;
    const nextPage = paginationParams.pageIndex + 1;
    const lastPage =  Math.ceil(paginationParams.count / ITEMS_PER_PAGE);

    let previousPageRendered = null;
    if(hasPreviousPage) {
        previousPageRendered = <li className="page-item">
                                    <Link className="page-link" to={`?page=${previousPage}`}>{previousPage}</Link>
                                </li>
    }

    let nextPageRendered = null;
    if(hasNextPage) {
        nextPageRendered = <li className="page-item">
                                <Link className="page-link" to={`?page=${nextPage}`}>{nextPage}</Link>
                            </li>
    }
    let previousStepperClasses = ["page-item"];
    if(currentPage === 1 && previousPage === 0) {
        previousStepperClasses.push("disabled")
    }

    let nextStepperClasses = ["page-item"];
    if(currentPage === lastPage && nextPage >= lastPage) {
        nextStepperClasses.push("disabled");
    }

    return <nav className="mt-5">
                <ul className="pagination justify-content-center">
                    <li className={previousStepperClasses.join(" ")}>
                        <Link className="page-link" to={`?page=${previousPage}`}>Previous</Link>
                    </li>
                    {previousPageRendered}
                    <li className="page-item active">
                        <Link className="page-link " to={`?page=${currentPage}`}>{currentPage}</Link>
                    </li>
                    {nextPageRendered}
                    <li className={nextStepperClasses.join(" ")}>
                        <Link className="page-link" to={`?page=${nextPage}`}>Next</Link>
                    </li>
                </ul>
            </nav>
}

export default pagination;