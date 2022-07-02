import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Paper } from '@material-ui/core'
import '../styles/Logs.css';
import Card from './Card';

const Logs = () => {
    const [data, setData] = useState(null);
    
    useEffect(() => {
      const loadData = async () => {
          try{
              const response = await axios.get("http://localhost:5000/api/transactions");
              setData(response);
  
          } catch (error){
  
          }
        };
  
      loadData();
      
    }, []);

    if(data == null){
        return(
            <h1>Page loading ...</h1>
        )
    }
    else{
        return (
            <body className="logs-body">
            <h1 className='transaction-title'>Transaction logs</h1>
            <h3 className='transaction-separator'>_________________________________________________________________________________________</h3>
            <div>{data.data.map(elem => {
                return(
                    <>
                    <div class="card">

                            <div className='watchimagecontainer'><img src={elem.Image}/></div>
                            <div className='firstname'>{elem.FirstName}</div>
                            <div className='watchname'>{elem.Name}</div>
                            <div className='watchprice'>{elem.Price}</div>
        
                    </div><br></br>
                    
                    
                    </>
                )
            }
          )
        }
        </div>
            </body>
                
            
          )
    }
 
}


export default Logs