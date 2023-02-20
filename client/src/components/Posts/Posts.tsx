import { PostsQueryVariables, usePostsQuery } from '../../generated/generated-types';
import Loading from '../LoadingAnimation/HomeLoading';
import Post from './Post';


interface PostsProps {
  variables: PostsQueryVariables;
  onLoadMore: (curPage: number) => void;
  isLastPage: boolean;
}





const Posts: React.FC<PostsProps> = ({ variables, onLoadMore, isLastPage }) => {
  const [{ data, fetching }] = usePostsQuery({ variables});

  if (fetching) {
    return (
      <div className='flex md:justify-start items-center justify-center'>
        <div className='grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 w-1/2  md:ml-16 mt-6'>
          <Loading />
          <Loading />
        </div>
      </div>
    )
  }

  if (data?.posts?.posts.length) {
    return (
      <div  data-testid="allPosts">
        <div className=' md:grid md:grid-cols-4 gap-9 md:p-11 p-5 sm:grid sm:grid-cols-2 flex flex-wrap items-center justify-center'>
          {data.posts.posts.map((post, index) => (
            <Post post={post as Post} key={index} />
          ))}
        </div>
        {((isLastPage && fetching) || ( data?.posts.hasMore && isLastPage)) ? (
          <div className='md:w-1/6 mx-auto mb-5 w-2/4'>
            <button type="button" onClick={()=>onLoadMore(data?.posts?.nextPage as number)}
              className="w-full focus:outline-none text-white bg-pink-600 hover:bg-pink-800 
            focus:ring-4 focus:ring-purple-300 
            font-medium rounded-lg text-base px-5 py-2.5 mb-2">
              Load more
            </button>
          </div>
        ) : null}
      </div>
    )
  } else {
    return <p>No posts here!</p>
  }

}



// const Search = ({ variables, onLoadMore }: any) => {
//   const [{ data, fetching }] = usePostsQuery({ variables});
//   const [curPage, setCurPage] = useState(0);
//   const handleLoadmore=()=>{
//     onLoadMore(curPage+1);
//     setCurPage(curPage+1);
//   }
//   return (
//     <>
//       {data?.posts.posts.map(item => <p key={item.id}>{item.title}</p>)}
//       <button
//         onClick={handleLoadmore}>
//         Loadmore
//       </ button>
//     </>
//   );

// }




// const Posts = () => {
//   const perPage = 8;
//   // const curPage=0;
//   const [pageVariables, setPageVariables] = useState([{ curPage:0, perPage }]);


//   return (
//     <>
//       {pageVariables.map(variables => (
//         <Search
//           key={'' + variables.curPage}
//           variables={variables}
//           onLoadMore={(curPage:any) => setPageVariables([...pageVariables, { curPage, perPage }])}
//         />
//       ))}
//     </>
//   )
// }


export default Posts;