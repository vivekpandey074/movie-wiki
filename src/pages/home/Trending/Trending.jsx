import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import "./styles.scss"
import Carousel from "../../../components/carousel/Carousel";

export default function Trending() {
 const [endpoint,setEndpoint]=useState("day");

 const {data,loading}=useFetch(`/trending/all/${endpoint}`)

  const onTabChange=(tab,index)=>{
     setEndpoint(tab==="Day"? "day":"week")
  }
  
    return (
    <div className="carouselSection">
     <ContentWrapper>
   <span className="carouselTitle"> Trending </span>
    <SwitchTabs onTabChange={onTabChange}  data={["Day","Week"]}>
    
    </SwitchTabs>
    </ContentWrapper>
    
    <Carousel data={data?.results} loading={loading}/>

    </div>
  )
}
