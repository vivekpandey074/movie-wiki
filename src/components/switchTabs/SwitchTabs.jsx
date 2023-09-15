import { useState } from "react";
import "./style.scss";

export default function SwitchTabs({data, onTabChange}) {
  const [left,setLeft]=useState(0);
  const [selectedTab,setSelectedTab]=useState(0);
  
    return (
    <div className="switchingTabs">
     <div className="tabItems"> 
      {data.map((tab,index)=>(
        <span 
        key={index} 
        className={`tabItem  ${selectedTab===index? "active":""}`}
        onClick={()=> {
            setLeft(index*100)
            setSelectedTab(index);
            onTabChange(tab,index);
        }}
        >
            {tab}
        </span>
        
      ))}
      <div className="movingbg" style={{left}}></div>
     </div>
    </div>
  )
}
