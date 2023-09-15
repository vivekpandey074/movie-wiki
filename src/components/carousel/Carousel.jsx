import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/contentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";

import "./style.scss";
export default function Carousel({data,loading, endpoint, title}) {
 const carouselContainer=useRef();
 const {url}=useSelector((state)=> state.home);
 const navigate=useNavigate();
 
 const navigation=(dir)=>{
const container=carouselContainer.current;
console.log(container.scrollLeft)

const scrollAmount= dir==="left"?container.scrollLeft-(container.offsetWidth+20):container.scrollLeft+(container.offsetWidth+20)

container.scrollTo({
  left:scrollAmount,
  behavior:"smooth",
})


 }


  return (
    <div className="carousel">
    <ContentWrapper>
      {title && <div className="carouselTitle">{title}</div>}
    <BsFillArrowLeftCircleFill
    className="carouselLeftNav arrow"
    onClick={()=>navigation("left")}/>
    <BsFillArrowRightCircleFill
    className="carouselRightNav arrow"
    onClick={()=>navigation("right")}/>
    
    {!loading? (
      <div className="carouselItems" ref={carouselContainer}>
        { data?.map((item)=>{
          const posterUrl=item.poster_path? url.poster + item.poster_path:PosterFallback
           
          return(
          <div key={item.id} className="carouselItem"
          onClick={()=>{ 
            navigate(`/${item.media_type || endpoint}/${item.id}`)}}>
           <div className="posterBlock">
             <Img src={posterUrl} />
             <CircleRating rating={item.vote_average.toFixed(1)}/>
           </div>
           <div className="textBlock">
            <span className="title">
              {(item.title && (item.title.length<15?item.title: item.title.slice(0,15).trim()+"..."))
               || (item.name && (item.name.length<15? item.name: item.name?.slice(0,15).trim()+"..."))}
            </span>
            <span className="date">
            {dayjs(item.release_Date).format("MMM D, YYYY")}
            </span>

           </div>
          </div>
          );
        })}
      </div>
    ):(
     <span style={{color:"white", fontSize:"50px", textAlign:"center"
                        }}>Loading...</span>
    )}




    </ContentWrapper>

    
    </div>
  )
}
