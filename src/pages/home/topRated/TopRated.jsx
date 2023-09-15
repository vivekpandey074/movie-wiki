import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import "./styles.scss"
import Carousel from "../../../components/carousel/Carousel";

export default function TopRated() {
 const [endpoint,setEndpoint]=useState("movie");

 const {data,loading}=useFetch(`/${endpoint}/top_rated`)

  const onTabChange=(tab,index)=>{
     setEndpoint(tab==="Movies"? "movie":"tv")
  }

  
  
    return (
    <div className="carouselSection">
     <ContentWrapper>
   <span className="carouselTitle"> Top Rated</span>
    <SwitchTabs onTabChange={onTabChange}  data={["Movies","TV Shows"]}>
    
    </SwitchTabs>
    </ContentWrapper>
    
    <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>

    </div>
  )
}
