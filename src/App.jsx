import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count,setCount] = useState(1);
  const [image, setImage] = useState();

  const [main,setMain] = useState("")
  const [show,setShow] = useState(false)
  const [loader,setLoader] = useState(false)
async function apiFetch(){
  setLoader(true)
  const url = 'https://api.slingacademy.com/v1/sample-data/photos?limit=20';
  const api = await fetch(url);
  const response = await api.json();
  console.log(response);
  setImage(response)
  setLoader(false)
}
useEffect(()=>{
  apiFetch();
},[])
function prev(){
  setCount(count -1 );
  setShow(false);
}
function next(){
  setCount(count +1 );
  setShow(false)
}
function settingMainImage(url){
  setMain(url);
  setShow(true)
}
if(loader){
  return <div>
    <h1>Loading...</h1>
  </div>
}
  return <>
  <div id="box">
    <img src={image?.photos[count-1].url} alt="" />
    <img src={show && main || image?.photos[count].url} alt="" />
    <img src={image?.photos[count+1].url} alt="" />
  </div>
  <button disabled={count <= 1 ?true : false } onClick={prev}>Prev</button>
  <button disabled={count < image?.photos.length - 2 ? false : true} onClick={next}>Next</button>
  <div className="hovBox">
    {image?.photos.map((img)=>{
      return <img onClick={()=>settingMainImage(img.url)} key={img.id} src={img.url}/>
    })}
  </div>
  </>;
}

export default App;
