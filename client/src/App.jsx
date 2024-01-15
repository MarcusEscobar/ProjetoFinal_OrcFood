import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {

  // const api = axios.create({
  //   baseURL: 'http://localhost:3000',
  // });
  
  const [info, setInfo] = useState("...")
  

  // useEffect(() => {
  // api.get('/').then((res)=> setInfo(res.data.message))

  // }, []);


  return (
    <div className="App">
      <Navbar />
      <div className='main_container'>
        <Outlet />
        <p>estou no frontend</p>
        <p>{info}</p>
      </div>
    </div>
  )
}

export default App
