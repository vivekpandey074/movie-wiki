import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/contentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";


export default function Explore() {
    const {mediaType}=useParams()
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(false);
    const [pageNum,setPageNum]=useState(1);
   



   const fetchInitialData=()=>{
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`).then((res)=>{
          setData(res)
          setPageNum((prev)=>prev+1);
            setLoading(false)
        })
   }

const fetchNextData=()=>{
  fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`).then((res)=>{
    if(data?.results){
      setData({
        ...data,
        results:[...data?.results, res.results]
      })
    }else{
       setData(res);
    }
   setPageNum((prev)=> prev+1)

  })




}


   useEffect(()=>{
      fetchInitialData();  
   },[mediaType])


    return (
        <div className="explorePage">
            {loading && (<div className="loading">Loading...</div>)}
            {!loading && (
                <ContentWrapper>
                {data?.results?.length>0?(
                  <>
                   <div className="pageTitle">
                    {`Explore ${mediaType==="movie"? "Movies": "TV Shows"}`}
                  </div>
                  <InfiniteScroll 
                className="content"
                dataLength={data?.results.length || []}
                next={fetchNextData}
                hasMore={pageNum<=data?.total_pages}
                loader={<div style={{color:"white"}}>Loading...</div>}
                >
                 {data.results.map((item,index) => {
                  return (
                  <MovieCard key={index} data={item} mediaType={mediaType}/>
                  )
                 })}
                </InfiniteScroll>
                </>
                ):(
                    <span className="resultNotFound">
                    No Results found!!
                   </span>
                )

                }
                </ContentWrapper>
            )


            }
        </div>
    )
}
