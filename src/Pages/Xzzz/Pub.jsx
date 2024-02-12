import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import items from "./../menus/sidebar.json";

const Footer = () => {
  const arrayLike = {
    length: 3,
    0: "a",
    1: "b",
    2: "c",
    3: "a", // ignored by filter() since length is 3
  };
  console.log(Array.prototype.filter.call(arrayLike, (x) => x <= "b"));
  // [ 'a', 'b' ]

  const words = [
    {
        "title": "Caviste/Resto",
        "icon": "bx bx-coffee",
        "path": "/support",
        "plus": true,
        "droits": 1,
        "plusPath": "/Plus_Resto"
    },
    {
        "title": "Publicités",
        "icon": "bx bx-euro",
        "path": "/Pub",
        "plus": true,
        "droits": 1,
        "plusPath": "/PubAdd"
    },
  ];

  const result = words.filter((word) => word === "title");

  console.log(result);
  // Expected output: Array ["exuberant", "destruction", "present"]




  return (
    <div>
        <p>Loading...</p>
    </div>
  );
  


}
export default Footer;
