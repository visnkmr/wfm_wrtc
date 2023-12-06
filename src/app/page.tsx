"use client"
import React from 'react'

export default function Home() {
    const [stext,setstext] = React.useState("")
    const [answer,setanswer] = React.useState("")
    var ds="";
    const localconnection=new RTCPeerConnection()
    const datachannel=localconnection.createDataChannel("channel")
    
    datachannel.onmessage = e => {
      ds+="\n got message "+e.data;
      setstext(ds)
    } 
    datachannel.onopen=e=>{ds+="\n con opened";
      setstext(ds)
    }
    localconnection.onicecandidate=e=>{ds+="\nnew ice candidate"+JSON.stringify(localconnection.localDescription);
      setstext(ds)
    }
    localconnection.createOffer().then(o=>localconnection.setLocalDescription(o)).then(a=>{ds+="\nset successfully."})
    localconnection.setRemoteDescription(answer)
  return (
    <>
    <p>Enter text to show</p>
    <input
        placeholder='Search in commit message for...'
        
        onChange={(event) =>
          {
            setanswer(event.target.value)
            console.log(event.target.value)
            
            // || table.getColumn('reponame')?.setFilterValue(event.target.value)
          }
        }
        className='w-[100%] bg-black'
      />
        <p>{stext}</p>
    </>
  )
}
