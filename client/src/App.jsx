import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";



function App() {

  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });
  
  const [info, setInfo] = useState("...")
  

  useEffect(() => {
  api.get('/').then((res)=> setInfo(res.data.message))

  }, []);


  return (
    <>
     <p>estou no frontend</p>
     <p>{info}</p>
    </>
  )
}

export default App
