import React, { useState } from 'react'
import { useMeQuery } from '../../generated/generated-types';
import Posts from './Posts';

const PaginationPosts = () => {
    const perPage = 8;
    const [pageVariables, setPageVariables] = useState([{ curPage: 0, perPage }]);
    const [{ data }] = useMeQuery();
    return (
        <div className='' >
            {!(data?.me?.id) && (
                <p data-testid="homepage-warning" className='text-red-500 mt-5 text-center font-bold text-lg p-5'>
                    **Log in to like and comment
                </p>
            )}
            {pageVariables.map((variables, index) => (
                <Posts
                    key={variables.curPage}
                    variables={variables}
                    onLoadMore={(curPage:number=0) => setPageVariables([...pageVariables, { curPage, perPage }])}
                    isLastPage={index === pageVariables.length - 1}
                />
            ))}
        </div>
    )
}

export default PaginationPosts