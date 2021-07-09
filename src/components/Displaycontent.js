import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";
import { UserContext } from "../context";
const Displaycontent = ({ itemData }) => {
  const [user,setUser] = useContext(UserContext).user;

const placeBids=(e)=>{
   let elementid=e.target.name;
   let id=Number(elementid);
   let docId;
   let bids=[];
   console.log("doisspa",user)
  db.collection("allBidItems").where("id", "==",id ).get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log(doc.data().placeBids)
          docId=doc.id;
          bids=doc.data().placeBids
        
      });
  }).then(()=>{
    const newObj={
      userId:user.email,price:0
    }
    console.log(docId)
    db.collection("allBidItems").doc(docId).update({
      placeBids:[...bids,newObj]

    })
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });

}

  return (
    <div>
      {itemData.map((items, index) => (
        <div key={items.id}>
          <p>{items.itemName}</p>
          <img src={items.itemUrl} alt="item" />
          <p> price:{items.startingPrice}</p>
          <button name={items.id} onClick={placeBids}>place bid</button>
        </div>
      ))}
    </div>
  );
};

export default Displaycontent;
