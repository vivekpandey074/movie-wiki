import { useEffect } from 'react'
import { fetchDataFromApi } from "./utils/api"
import { getApiConfiguration } from "./store/homeSlice";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PagenotFound';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
  const dispatch = useDispatch();
  // const { url } = useSelector((state) => state.home)

  useEffect(() => {
  fetchApiConfig();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
   
    const  url={
        backdrop:res.images.secure_base_url+"original",
        poster:res.images.secure_base_url+"original",
        profile:res.images.secure_base_url+"original",
      }
    
      dispatch(getApiConfiguration(url))
    })
  }
  return (<BrowserRouter>
     <Header/>
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>

      <Route path="/:mediaType/:id" element={<Details />}>
      </Route>
      <Route path="/search/:query" element={<SearchResult />}>
      </Route>
      <Route path="/explore/:mediaType" element={<Explore />}>
      </Route>

      <Route path="*" element={<PageNotFound />}>
      </Route>
    </Routes>
     <Footer/>
  </BrowserRouter >)

}

export default App
