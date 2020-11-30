import React from "react";
import "./styles/Home.css";

import Product from "../components/Product";

const img_Urls = [
  "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/CyberMonday/Fuji_TallHero_CM_v2_en_US_1x._CB414209152_.png",
  "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
  "https://images-fe.ssl-images-amazon.com/images/G/35/kindle/merch/2020/bfcmpX83Kxq1/hero/pc_gw_xpl_bfcm_2_1x._CB416201492_.jpg",
];

function Home() {
  return (
    <div className="home">
      <div className="homeContainer">
        <img
          src={img_Urls[Math.floor(Math.random() * img_Urls.length)]}
          alt=""
          className="bannerImage"
        />

        <div className="homeRow">
          <Product
            title="Sony PS4 1TB Slim Console with Additional Dualshock Controller & God of War (PS4) "
            image="https://images-na.ssl-images-amazon.com/images/I/81vP3wTlRoL._SL1500_.jpg"
            price={499.0}
            rating={4}
            id={456}
          />
          <Product
            title="Fire TV Stick with Alexa Voice Remote (includes TV controls) | Stream HD Quality Video with Dolby Atmos Audio"
            image="https://images-na.ssl-images-amazon.com/images/I/51Tbwd2PaDL._SL1000_.jpg"
            price={399.99}
            id={5456}
            rating={3}
          />
        </div>

        <div className="homeRow">
          <Product
            title="iPhone X 128 GB Space Gray"
            price={799.0}
            rating={4}
            id={3456}
            image="https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png"
          />
          <Product
            title="Wildcraft 65 ltrs Green Hiking Backpack (Gangotri Plus Green)"
            price={199.5}
            id={2456}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/91mVoMhPlmL._SL1500_.jpg"
          />
          <Product
            title="The Hitman: The Rohit Sharma Story Paperback"
            image="https://images-na.ssl-images-amazon.com/images/I/51oBkcJvDRL._SX326_BO1,204,203,200_.jpg"
            price={48.9}
            id={4356}
            rating={4}
          />
        </div>

        <div className="homeRow">
          <Product
            title="New Apple MacBook Pro (13-inch, 8GB RAM, 512GB SSD, 1.4GHz Quad-core 8th-Generation Intel Core i5 Processor, Magic Keyboard) - Space Grey"
            price={1699.99}
            id={4546}
            image="https://images-na.ssl-images-amazon.com/images/I/71YRSVXhgQL._SL1500_.jpg"
          />
          <Product
            title="Nike Men's Regular Fit T-Shirt "
            price={290.4}
            id={4565}
            image="https://images-na.ssl-images-amazon.com/images/I/81HKxM07U7L._UL1500_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
