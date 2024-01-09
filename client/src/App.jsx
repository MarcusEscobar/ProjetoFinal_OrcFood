import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";



function App() {

  const api = axios.create({
    baseURL: 'http://localhost:5173',
  });
  
  const [info, setInfo] = useState("...")
  

  useEffect(() => {


    fetch("/api",{
      method: 'GET',
      })
      .then((res) => console.log(res))
  }, []);


  return (
    <>
     <p>{info}</p>
    </>
  )
}

export default App
