import React, { useEffect, useState } from 'react';
import './Pagination.scss';

const Pagination = ({ total, dataLimit, currentPage, onPageChange }) => {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (total > 0 && dataLimit > 0) {
            setTotalPages(Math.ceil(total / dataLimit));
        }
    }, [total, dataLimit]);

    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [currentPage]);

    const paginationItems = () => {
        const pages = [];

        for(let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`paginationItem ${i === currentPage ? 'active' : null}`}
                >
                    <span>{i}</span>
                </button>
            )       
        }

        return pages;
    }

    if (totalPages === 0) {
        return null;
    }

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className={`prev ${currentPage === 1 ? "disabled" : null}`}
            >
                prev
            </button>
            {paginationItems()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className={`next ${currentPage === totalPages ? "disabled" : null}`}
            >
                next
            </button>
        </div>
    );
}

export default Pagination;
