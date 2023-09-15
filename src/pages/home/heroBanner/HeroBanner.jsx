import { useEffect, useState } from "react";
import "./style.scss"
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";

export default function HeroBanner() {
    const [background,setBackground]=useState("");
    const [query,setQuery]=useState("");
    const {data,loading}=useFetch("/movie/upcoming");
    const {url}=useSelector((state)=> state.home);


    const navigate=useNavigate();

    useEffect(()=>{
        const bg=url.backdrop+data?.results[Math.floor(Math.random()*20)]?.backdrop_path
        setBackground(bg);
    },[data])



    function searchQueryHandler(e){
        if(e.key==="Enter" && query.length>0)
        { navigate(`/search/${query}`)}
    }

    return (
        <div className="HeroBanner">
            {!loading && (
                 <div className="backdrop-img">
                 <Img src={background}/>
    
                </div>
            )}
            
            <div className="opacity-layer"> </div>
            <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title"> Welcome</span>
                <span className="subtitle"> Millions of Movies, TV show and people to discover. Explore Now</span>
                <div className="searchInput">
                <input type="text"
                placeholder="Search for a movie or tv show...." 
                value={query}
                onKeyUp={searchQueryHandler}
                onChange={(e)=>{setQuery(e.target.value)}}/>
               
                <button>Search</button>
                </div>
              </div>
            
            </ContentWrapper>
        </div>
    )
}
