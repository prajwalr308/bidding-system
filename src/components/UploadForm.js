import React, { useEffect, useState } from 'react';
import {db,storage} from '../firebase'
import firebase from 'firebase'
 
 const UploadForm = () => {

    const [info, setInfo] = useState({itemName:"",itemImage:{},startingPrice:""})
    const [progress, setProgress] = useState(0);
const [prevItems, setPrevItems] = useState();
const [newObj, setnewObj] = useState({})

   
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
         
            storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
                 setnewObj({
                    itemName:info.itemName,
                    itemUrl:imageUrl,
                    startingPrice:info.startingPrice

                })
                console.log(newObj)
              db.collection("allBidItems").doc("new").get().then((doc) => {
              
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                  setPrevItems(doc.data().items)
                   console.log("prev",prevItems)
             
                  
    
                })
              
             
               
       
            }).then(()=>{
                db.collection("allBidItems").doc("new")
                    .update({
                        items: firebase.firestore.FieldValue.arrayUnion(newObj)
                    });
                    
                 
            });
    })}
    

    return(

    <div>
   
        <form>
          <input name="itemName" onChange={onChangeHandler} />
         
          <input name="startingPrice" onChange={onChangeHandler} />
          <input  type="file" name="itemImage" onChange={selectfile} />
         
          <button onClick={uploadFile}>
            Submit
          </button>
        </form>
  
  </div>
 );
      }
 export default UploadForm;
