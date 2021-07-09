import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";
const Displaycontent = ({ itemData }) => {
  return (
    <div>
      {itemData.map((items, index) => (
        <div key={items.id}>
          <p>{items.itemName}</p>
          <img src={items.itemUrl} alt="item" />
          <p> price:{items.startingPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default Displaycontent;
