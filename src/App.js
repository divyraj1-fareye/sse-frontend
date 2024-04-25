import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';

function App() {
  
  const [dataArray, setDataArray] = useState([]);


  useEffect(()=>{
   
    const eventSource = new EventSource("http://localhost:8081/server-events/events");

      eventSource.onmessage = (event) => {
       let data = JSON.parse(event.data)
       setDataArray(prevArray => [data, ...prevArray]);
     };

    return () => {
      eventSource.close();
    };

  },[])


  return  (

    <div style={{backgroundColor:'pink'}}>
      
        {dataArray.map((item, index) => (
          <div  style={{height:100,width:500,backgroundColor:'yellow',margin:'50px', border:'2px solid red', borderRadius:'5px'}}  key={index}>
 
            <div  style={{ height:30,display:'flex',justifyContent:"center" ,paddingTop:30}} >
             <span>Name :</span>
             <span>{item.name}</span>
            </div>
           <div  style={{ height:30,display:'flex',justifyContent:"center" }} >
             <span>Entry Time :</span>
             <span>{item.localDateTime}</span>
           </div> 
          </div>
       ))}
    </div>

  )

}

export default App;
