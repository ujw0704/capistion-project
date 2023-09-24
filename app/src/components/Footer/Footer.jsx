import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <>
    <footer>
      <div className='firstList'>
        <h1>Company</h1>
      <ul>
        <li>About Us</li>
        <li>Career</li>
        <li>Blog</li>
        <li>Contact Us</li>
      </ul>
      </div>
      <div className='firstList'>
      <h1>Policies</h1>
      <ul>
        <li>Privacy Policies</li>
        <li>Terms of Use</li>
        <li>Secure Shopping</li>
        <li>Copyright Policy</li>
      </ul>
      </div>
      <div className='firstList'>
      <h1>Help</h1>
      <ul>
        <li>Payment</li>
        <li>Shipping</li>
        <li>Return</li>
        <li>FAQ</li>
      </ul>
      </div>
      <div className='firstList'>
      <h1>Misc</h1>
      <ul>
        <li>Affiliate</li>
        <li>Sitemap</li>
        <li>Affiliate</li>
        <li>Sitemap</li>
      </ul>
      </div>
     
    </footer>
    </>
  )
}

export default Footer