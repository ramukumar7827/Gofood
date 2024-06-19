import React from "react";

export default function Card({ title, text, imageSrc, foodCat }) {
  return (
    <div className="card mt-3" style={{ width: "18rem", height: "400px" }}>
      <img
        className="card-img-top"
        src={imageSrc}
        alt="Card image cap"
        style={{ maxHeight: "200px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text" style={{ height: "100px" }}>
          {text}
        </p>
        <div className="container w-100">
          <select className="m-2  bg-success rounded">
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select className="m-2  bg-success rounded">
            {foodCat != []
              ? foodCat.map((data) => {
                  return <option key={data._id}>{data.CategoryName}</option>;
                })
              : ""}
          </select>
        </div>
      </div>
    </div>
  );
}
