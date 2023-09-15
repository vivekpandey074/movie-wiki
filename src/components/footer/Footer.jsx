import React from 'react'
import "./style.scss"
import ContentWrapper from '../contentWrapper/contentWrapper'

import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";




const Footer = () => {
    return (
        <footer className='footer'>
        <ContentWrapper> 
        <ul className='menuItems'>
            <li className='menuItem'>Terms of Use</li>
            <li className='menuItem'>Privacy-policy</li>
            <li className='menuItem'>About</li>
            <li className='menuItem'>Blog</li>
            <li className='menuItem'>FAQ</li>
        </ul>
        <div className='infoText'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit molestiae dolores officiis fugit culpa similique recusandae quod ullam reprehenderit iusto? Dolor molestias eius repellat quod quasi nihil quisquam sapiente illum pariatur sequi atque ratione veniam doloribus nam, consequuntur quidem distinctio, inventore sed nobis, sunt ex maiores quam! Laborum, cumque </div>
            <div className='socialIcons'>
            <span className='icon'> <FaFacebook/></span>
            <span className='icon'> <FaInstagram/></span>
            <span className='icon'> <FaTwitter/></span>
            <span className='icon'> <FaLinkedin/></span>        
            </div>    

        </ContentWrapper>
        </footer>
    )
}

export default Footer
