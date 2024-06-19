import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Card from "../components/Card";

export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const localData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    localData();
  }, []);
  return (
    <div>
      <div>
        <Navbar></Navbar>
        <Carousel></Carousel>
      </div>
      <div className="container">
        {foodCat != []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data.data} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem != [] ? (
                    foodItem
                      .filter((item) => item.CategoryName == data.CategoryName)
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card title={filterItems.name} foodCat={foodCat} imageSrc={filterItems.img} text={filterItems.description}></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such Data found</div>
                  )}
                </div>
              );
            })
          : []}
             
      </div> 
       
    </div>
  );
}
