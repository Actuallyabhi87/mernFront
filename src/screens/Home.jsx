import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch(
      `https://mernback-lpy5.onrender.com/api/foodData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="container">
        {foodCat.map((data) => (
          <div className="row mb-3" key={data_id}>
            <React.Fragment key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem
                .filter((item) => item.CategoryName === data.CategoryName)
                .map((filterItems) => (
                  <div
                    key={filterItems._id}
                    className="col-12 col-md-6 col-lg-3"
                  >
                    <Card
                      foodItem={filterItems}
                      options={filterItems.options[0]}
                    ></Card>
                  </div>
                ))}
            </React.Fragment>
          </div>
        ))}
        {foodCat.length === 0 && <div>Server is slow please wait</div>}
        {/* Render a message if no data is found */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
