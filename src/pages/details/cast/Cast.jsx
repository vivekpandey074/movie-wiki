import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import "./styles.scss";
import avatar from "../../../assets/avaatar.jpg"
import Img from "../../../components/lazyLoadImage/Img";
import { useSelector } from "react-redux";

export default function Cast({ data,loading}) {
  const {url}= useSelector((state)=>state.home);
  
  
    return (
    <div className="castSection">
        <ContentWrapper>
        <div className="sectionHeading"> Top Cast </div>
        {loading===false?(
        <div className="listItems">
            {data.map((item)=>{
              let imgUrl=item.profile_path? url.profile+item.profile_path:avatar;

                return (
                  <div key={item.id} className="listItem">
                          <div className="profileImg">
                            <Img src={imgUrl}/>
                          </div>
                          <div className="name">{item.name}</div>
                          <div className="character">{item.character}</div>
                  </div>
                );
            })}
        </div>
        ):(
          <div style={{color:"white", fontSize:"50px"}}>Loading...</div>
        )}
        </ContentWrapper>
      
    </div>
  ) 
}
