import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState([]);
  const [count,setCount] = useState(1);
  const [main,setMain] = useState("")
  const [show,setShow] = useState(false)
async function apiFetch(){
  const url = 'https://api.slingacademy.com/v1/sample-data/photos?limit=20';
  const api = await fetch(url);
  const response = await api.json();
  console.log(response);
  setImage(response)
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
