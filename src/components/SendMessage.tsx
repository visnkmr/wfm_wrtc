import { DataTypeDesc } from "@/app/page"
import { MessageTypeDesc, dlfd } from "./Hpage"
import { useState } from "react"

export default function SendMessage({peer}){
    console.log(peer)
    let [text,addtext]=useState("")
    const sendMessage=()=> {
        // send message at sender or receiver side
        if (peer) {
            dlfd("sending message")
          let sm=(JSON.stringify(
            {
            type:"message",
            value: 
            text
    
          }))
            // setm("Me : " + msg.value)
            dlfd(sm)
            peer.send(sm)
            
            
        }
    }
    return(
        <>
        <textarea placeholder="Enter code here" className='bg-black text-white' value={text} onChange={(e) => {
            addtext(e.target.value);
            
            }} />
        <br />
        {/* <p>
            {mh}
        </p> */}
        <button onClick={sendMessage}>Send</button>
        </>
    )
}