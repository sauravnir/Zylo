import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState("");
  
  useEffect(() => {
    axios.get("http://localhost:5000/").then((response)=>{
      setCount(response.data.message)
    }).catch((err)=>{
      console.log(err);
      setCount("Couldnot load the data")
    });
    
  },[]);

  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default App;
