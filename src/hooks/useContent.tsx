import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent(shareHash?:string) {
    const [contents, setContents] = useState([]);   
    function refresh() {
        if(shareHash){
            axios.get(`${BACKEND_URL}/api/v1/brain/${shareHash}`).then((response)=>{
                setContents(response.data.content || []);
            }).catch(()=>{
                setContents([]);
            })
            return;     
        }
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            setContents(response.data.content);
        })
    }
    useEffect(() => {
        let interval=setInterval(()=>{
            refresh();
        },10*1000)
        return () => clearInterval(interval);
    }, [])
    useEffect(()=>{
        refresh();
    },[shareHash])
    return {contents,refresh};
}