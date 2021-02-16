const mongoose = require("mongoose");
const Product = require("../models/productModel");

require("dotenv").config({ path: "../.env" });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection established to the database.");
});

const products = [
  {
    name:
      "Sony PS4 1TB Slim Console with Additional Dualshock Controller & God of War (PS4)",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81vP3wTlRoL._SL1500_.jpg",
    price: 499.0,
    rating: 4,
  },
  {
    name:
      "Fire TV Stick with Alexa Voice Remote (includes TV controls) | Stream HD Quality Video with Dolby Atmos Audio",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51Tbwd2PaDL._SL1000_.jpg",
    price: 399.99,
    rating: 3,
  },
  {
    name: "iPhone X 128 GB Space Gray",
    image:
      "https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png",
    price: 799.0,
    rating: 4,
  },
  {
    name: "Wildcraft 65 ltrs Green Hiking Backpack (Gangotri Plus Green)",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/91mVoMhPlmL._SL1500_.jpg",
    price: 199.5,
    rating: 3,
  },
  {
    name: "The Hitman: The Rohit Sharma Story Paperback",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51oBkcJvDRL._SX326_BO1,204,203,200_.jpg",
    price: 48.99,
    rating: 4,
  },
  {
    name:
      "Apple MacBook Pro (13-inch, 8GB RAM, 512GB SSD, 1.4GHz Quad-core 8th-Generation Intel Core i5 Processor, Magic Keyboard) - Space Grey",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71YRSVXhgQL._SL1500_.jpg",
    price: 1699.99,
    rating: 4,
  },
  {
    name: "Nike Men's Regular Fit T-Shirt",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81HKxM07U7L._UL1500_.jpg",
    price: 290,
    rating: 4,
  },
  {
    name: "THE Bonsai Plant Beautiful Adenium Dessert Rose Plant",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/91jTyLFFEKL._SL1500_.jpg",
    price: 2.49,
    rating: 3,
  },
  {
    name: "Ghostbuster",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/917sjSbC%2BPL._SL1500_.jpg",
    price: 4.99,
    rating: 4,
  },
  {
    name: "Pedigree Adult Dry Dog Food, Meat & Vegetables, 22kg Pack",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/61WClZupGQL._SL1000_.jpg",
    price: 49.0,
    rating: 4,
  },
  {
    name: "ZOTAC Gaming GeForce RTX 2060",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81A7-PCCPDL._SL1500_.jpg",
    price: 799.0,
    rating: 5,
  },
  {
    name: "Western Digital Elements 1TB Portable External Hard Drive (Black)",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81u47A2BChL._SL1500_.jpg",
    price: 49.0,
    rating: 4,
  },
  {
    name: "ASUS VivoBook Gaming F571GD-BQ368T 15.6' FHD Thin and Light Laptop",
    image: "https://images-na.ssl-images-amazon.com/images/I/416usJOJaNL.jpg",
    price: 499.0,
    rating: 4,
  },
  {
    name:
      "Logitech G 331 Gaming Headset 6 mm Flip-to-Mute Mic for Playstation 4, Xbox One and Nintendo Switch",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51F635OpcQL._SL1024_.jpg",
    price: 49.0,
    rating: 4,
  },
  {
    name: "Canon Pixma G3000 All-in-One Wireless Ink Tank Colour Printer",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/61saGX0RILL._SL1040_.jpg",
    price: 199.0,
    rating: 4,
  },
];

products.forEach((product) => {
  const prod = new Product({
    name: product.name,
    img: product.image,
    rating: product.rating,
    price: product.price,
  });

  prod.save();
});
