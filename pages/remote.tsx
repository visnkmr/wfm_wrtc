"use client"
import React from 'react'

export default function Home() {
    const [stext,setstext] = React.useState("")
    var ds="";
    const [offer,setoffer] = React.useState("")
    const localconnection=new RTCPeerConnection()
    // const datachannel=localconnection.createDataChannel("channel")
    localconnection.onicecandidate=e=>{ds+="\nnew ice candidate"+JSON.stringify(localconnection.localDescription);
      setstext(ds)
    }
    var recievechannel:RTCDataChannel;
    localconnection.ondatachannel=e=>{
        recievechannel=e.channel;
        recievechannel.onmessage = e => {
          ds+="\n got message "+e.data;
          setstext(ds)
        } 
        recievechannel.onopen=e=>{ds+="\n con opened";
          setstext(ds)
        }
        recievechannel.onclose =e => console.log("closed!!!!!!");
        // localconnection.channel = recievechannel;
    }

    localconnection.setRemoteDescription(offer).then(a=>ds+=("offer set"))
    localconnection.createAnswer().then(a => localconnection.setLocalDescription(a)).then(a=>
        ds+=(JSON.stringify(localconnection.localDescription)))\
    if(offer && recievechannel) recievechannel.send("recieved")
    // localconnection.createOffer().then(o=>localconnection.setLocalDescription(o)).then(a=>{ds+="\nset successfully."})
  return (
    <>
    <p>Enter text to show</p>
    <input
        placeholder='Search in commit message for...'
        
        onChange={(event) =>
          {
            setoffer(event.target.value)
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
