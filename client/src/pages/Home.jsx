import React, { useState, useEffect } from "react";
import "./styles/Home.css";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import Product from "../components/Product";

import axios from "axios";

const img_urls = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonDevices/PSW/V2.PSW_DesktopMaster_1500x600-Prime._CB413743016_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/prime/AugustShopping_Week_1500x600._CB406224931_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2020/May/gaming_1500x600._CB431281464_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
];

function Home() {
  const [slide, setSlide] = useState(0);

  const length = img_urls.length;

  const [products, setProducts] = useState(null);

  const nextSlide = () => {
    setSlide(slide === length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? length - 1 : slide - 1);
  };

  useEffect(async () => {
    await axios.get("http://localhost:8888/products/home").then((res) => {
      setProducts(res.data.sample);
    });
  }, []);

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="slider">
          <div className="left_icon">
            <ChevronLeftIcon onClick={prevSlide} />
          </div>
          <div className="right_icon">
            <ChevronRightIcon onClick={nextSlide} />
          </div>
          {img_urls.map((img, index) => (
            <div
              className={index === slide ? "slide active" : "slide"}
              key={index}
            >
              {index === slide && (
                <img src={img} alt="amazon" className="slide_image" />
              )}
            </div>
          ))}
        </div>

        <div className="homeRow">
          <Product
            title={products ? products[0].name : "Loading"}
            image={
              products
                ? products[0].img
                : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            }
            price={products ? products[0].price : 0}
            rating={products ? products[0].rating : 0}
            id={products ? products[0]._id : 0}
          />
          <Product
            title={products ? products[1].name : ""}
            image={
              products
                ? products[1].img
                : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            }
            price={products ? products[1].price : 0}
            rating={products ? products[1].rating : 0}
            id={products ? products[1]._id : 0}
          />
        </div>

        <div className="homeRow">
          <Product
            title={products ? products[2].name : ""}
            image={
              products
                ? products[2].img
                : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            }
            price={products ? products[2].price : 0}
            rating={products ? products[2].rating : 0}
            id={products ? products[2]._id : 0}
          />
          <Product
            title={products ? products[3].name : ""}
            image={
              products
                ? products[3].img
                : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            }
            price={products ? products[3].price : 0}
            rating={products ? products[3].rating : 0}
            id={products ? products[3]._id : 0}
          />
          <Product
            title={products ? products[4].name : ""}
            image={
              products
                ? products[4].img
                : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            }
            price={products ? products[4].price : 0}
            rating={products ? products[4].rating : 0}
            id={products ? products[4]._id : 0}
          />
        </div>

        <div className="homeRow">
          <Product
            title={products ? products[5].name : ""}
            image={
              products
                ? products[5].img
                : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            }
            price={products ? products[5].price : 0}
            rating={products ? products[5].rating : 0}
            id={products ? products[5]._id : 0}
          />
          <Product
            title={products ? products[6].name : ""}
            image={
              products
                ? products[6].img
                : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            }
            price={products ? products[6].price : 0}
            rating={products ? products[6].rating : 0}
            id={products ? products[6]._id : 0}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
