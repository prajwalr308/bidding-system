import React, { useEffect, useState } from 'react'
import {db,storage} from '../firebase'
import firebase from 'firebase'
const Displaycontent = () => {
const [itemData, setitemData] = useState([])
const item=[]

    useEffect(() => {
        db.collection("allBidItems").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
         
             item.push(doc.data());
              console.log(item);
              
            });
          setitemData(item)
        })

    }, [])
    return (
        <div>
        {itemData.map((items,index)=>(
           <div key={items.id}>
                 
           <p >{items.itemName}</p>
           <img src={items.itemUrl} alt="item" />
           <p > price:{items.startingPrice}</p>
           </div>
       )
           
          
       )
       
       }
        </div>
    )
}

export default Displaycontent
