import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.scss';


type PaginationProps = {
    onChangePage: (page: number) => void,
    totalPages: number
}


const Pagination: React.FC<PaginationProps> = ({ onChangePage, totalPages }) => {
    return (
        <>
            <ReactPaginate
                className='pagination'
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => onChangePage(e.selected + 1)}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    );
};

export default Pagination;