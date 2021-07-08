import React, { useEffect, useState } from 'react';
import {db,storage} from '../firebase'
import firebase from 'firebase'
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

 
 const UploadForm = () => {

    const [info, setInfo] = useState({itemName:"",itemImage:{},startingPrice:""})
    const [progress, setProgress] = useState(0);
const [prevItems, setPrevItems] = useState();
const [date1, setDate1] = useState(new Date());
const [date2, setDate2] = useState(new Date());

  function onChange1(date) {
    setDate1(date);
  }
  function onChange2(date) {
    setDate2(date);
  }



   
   function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

     function onChangeHandler(e){
       
        setInfo({...info,[e.target.name]:e.target.value})

    }
    function selectfile(e){
        console.log(e.target.files[0])
        setInfo({...info,[e.target.name]:e.target.files[0]})

    }

    const uploadFile=async(e)=>{
        e.preventDefault()
        
        const imageName=makeid(10);
        const uploadTask = storage.ref(`images/${imageName}.jpg`).put(info.itemImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async() => {
          let newObj;
          let length;
            storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then(async(imageUrl) => {
              await db.collection("allBidItems").get().then(function(querySnapshot) {      
                length=querySnapshot.size+1; 
                console.log( length)
             
             });
             newObj={
id:length,
                    itemName:info.itemName,
                    itemUrl:imageUrl,
                    startingPrice:info.startingPrice,
                    fromDate:date1,
                    toDate:date2

                }
                console.log(newObj)
        
   
              
             
               
       
            }).then(()=>{
             
              db.collection("allBidItems").add(newObj)
            });;
    })}
    

    return(

    <div>
   
        <form>
          <input name="itemName" onChange={onChangeHandler} />
         
          <input name="startingPrice" onChange={onChangeHandler} />
          <input  type="file" name="itemImage" onChange={selectfile} />
          <DayPickerInput onDayChange={onChange1} />;
          <DayPickerInput onDayChange={onChange2} />;
         
          <button onClick={uploadFile}>
            Submit
          </button>
        </form>
  
  </div>
 );
      }
 export default UploadForm;
