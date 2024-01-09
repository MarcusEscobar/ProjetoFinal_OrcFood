import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";



function App() {

  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });
  
  const [info, setInfo] = useState("...")
  

  useEffect(() => {
  const r =api.get('/').then((res)=> setInfo(res.data.message))

  }, []);


  return (
    <>
     <p>{info}</p>
    </>
  )
}

export default App
