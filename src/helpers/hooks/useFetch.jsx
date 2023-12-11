import {instance} from "../../api"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);
    useEffect(() => {
        const  fetchData = async () => {
        try{
            const response = await instance(endpoint)
            setData(response.data.data)
        }catch(error){
            console.log(error);
        }
        // finally{
        //     setLoading(false)
        //    }
        }
        
        fetchData(data)
    }, [])
    return data
    
}

export default useFetch