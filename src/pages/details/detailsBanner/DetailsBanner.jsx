import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import "./styles.scss";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import PosterFallBack from "../../../assets/no-poster.png"
import dayjs from "dayjs";
import CircleRating from "../../../components/circleRating/CircleRating";
import {
  AiFillPlayCircle,
} from "react-icons/ai";

export default function DetailsBanner({video, crew}) {
     const {mediaType,id}=useParams();
   const {data,loading}=useFetch(`/${mediaType}/${id}`)
   const {url}=useSelector((state)=>state.home);
   
   const director=crew?.filter((f) => f.job==="Director");
   const writer=crew?.filter((f) => f.job==="Screenplay" || f.job==="Story" || f.job==="Screeplay" );
   
  


   //function to format time in sec to hours and minutes
   const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};


  return (
    <div className="detailsBanner">
      {loading===false?(
        <>
         <div className="backdrop-img">
         <Img src={url.backdrop+data?.backdrop_path}/>
         </div>
         <div className="opacity-layer"/>
         <ContentWrapper>
         <div className="content">
          <div className="left">

          {data?.poster_path?(
          <Img className="posterImg" src={url.backdrop+data?.poster_path}/>
          ):(<Img className="posterImg" src={PosterFallBack}/>
          )}
          </div>

          <div className="right">
          <div className="title">
            {`${data?.name || data?.title} (${dayjs(data?.release_date).format("YYYY")})`}
          </div>
          <div className="subtitle">
            {data.tagline}
          </div>
          <div className="genres">
            {data.genres.map((item)=>item.name).join(', ')}
          </div>
          <div className="row">
          <CircleRating rating={data.vote_average.toFixed(1)}/>
          <span className='icon' onClick={()=>{
           const externalLink = `https://www.youtube.com/watch?v=${video.key}` 
           window.open(externalLink, '_blank');

          }}><AiFillPlayCircle size={60}/></span> 
          <span className="text">Watch trailer</span>
          </div>
          <div className="overview">
           <div className="heading">Overview</div>
           <div className="description">{data.overview}</div>
          </div>
          <div className="info">
          {(data.release_date || data.first_air_date) && (
             <div className="infoItem">
             ReleaseDate:{" "}
             <span>
              {mediaType === "tv" ? dayjs(data.first_air_date).format("MMM D, YYYY"):dayjs(data.release_date).format("MMM D, YYYY")        
              }
              
              </span>
           </div>
          )}
           {data.status && (
             <div className="infoItem">
             Status:{" "}
             <span>{data.status}</span>
           </div>
          )}
           {data.runtime && (
             <div className="infoItem">
             Runtime:{" "}
             <span>{toHoursAndMinutes(
              data.runtime
             )}</span>
           </div>
          )}

          </div>
         
         {director?.length>0 && (
            <div className="director">
            Director :{" "}
            {director?.map((d,i) =>(
             <span key={i}>
             {d.name}
             {director.length-1 !==i && ", " }
             </span>
            ))}
            </div>
         )}

         {writer?.length>0 && (
            <div className="director">
            Writer :{" "}
            {writer?.map((d,i) =>(
             <span key={i}>
             {d.name}
             {writer.length-1 !==i && ", " }
             </span>
            ))}
            </div>
         )}
         
         {mediaType==="tv" && (data?.created_by?.length>0 && (
            <div className="director">
            Created By :{" "}
            {data?.created_by?.map((d,i) =>(
             <span key={i}>
             {d.name}
             {data?.created_by?.length-1 !==i && ", " }
             </span>
            ))}
            </div>
         ))}



          </div>
         </div>
        </ContentWrapper>  
       
        </>
      ):(
      <div style={{color:"white", fontSize:"30px"}}>Loading...</div>
      )}
    </div>
  )
}
