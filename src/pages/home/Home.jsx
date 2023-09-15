import "./style.scss"
import "./heroBanner/HeroBanner"
import HeroBanner from "./heroBanner/HeroBanner"
import Trending from "./Trending/Trending"
import Popular from "./Popular/Popular"
import TopRated from "./topRated/TopRated"

export default function Home() {
    return (
        <div className="homePage">
            <HeroBanner/>
            <Trending/>
            <Popular/>
            <TopRated/>
        </div>
    )
}
