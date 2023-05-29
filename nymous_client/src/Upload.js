import {useState, useEffect} from "react";
import React from "react";
import axios from "axios";
import pageutilisateur from "./pageutilisateur.module.css";

function Upload(props){

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource,setPreviewSource] = useState();
    const [imageURL, setImageURL] = useState();
    const [name,setName]=useState(props.name)

    const handleFileInputChange = (e) => {
        const file =e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader =  new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        console.log("submitting");
        e.preventDefault();
        if(!previewSource) return;
        uploadImage(previewSource);
    }

    function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage);
        try {
            await fetch('http://localhost:8000/api/upload', {
                method: 'POST',
                body: JSON.stringify({data: base64EncodedImage, public_id:props.login, type: "user_pictures"}),
                headers: {'Content-type': 'application/json'}
            })
        } catch (error) {
            console.error(error);
        }
        finally{
            await delay(2000)
            loadImage();
        }
    }

    async function loadImage() {
        //console.log("oui je charge")
        axios
            .get(`http://localhost:8000/api/images/${props.name}`)
            .then((response) => {setImageURL(`${response.data.url.url}?${Date.now()}`)});
    }

    useEffect(() => {
        loadImage();
    }, []);

    if(name!=props.name){
        loadImage();
        setName(props.name)
    }
    
    //console.log("ayoo ",imageURL)
    
    function Submit(){
        if(props.self){
            return(
                <div>
                    <img src={imageURL} className={pageutilisateur.photo_profil}/>
                    <form onSubmit={handleSubmitFile} className={pageutilisateur.form}>
                        <input type="file" name="image" onChange={handleFileInputChange} 
                        value={fileInputState} className={pageutilisateur.input} 
                        accept="image/*"/>
                        <button className={pageutilisateur.submit} type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            )
        }
        else{
            return(
                <img src={imageURL} className={pageutilisateur.photo_profil_2}/>
            )
        }
    }

    return(
        <div className={pageutilisateur.div_images}>
            {/*
            <img src={imageURL} className={pageutilisateur.photo_profil}/>
            <form onSubmit={handleSubmitFile} className={pageutilisateur.form}>
                <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className={pageutilisateur.input}/>
                <button className={pageutilisateur.submit} type="submit">
                    Submit
                </button>
            </form>
            */}
            {Submit()}
        </div>
    )
}

export default Upload;