'use client'
import React, { useEffect } from 'react'
// import nodeDatachannelPolyfill from 'node-datachannel/polyfill';
import { useState } from 'react'
// import { createRequire } from 'module';
import wrtc from "wrtc"
import Peer from 'simple-peer'
import { debug } from 'util';
export default function Home() {
  // const require = createRequire(import.meta.url);
  console.log(require)
    const [sdp, setSdp] = useState('')
    const [peer, setp] = useState<Peer>(null)
    const [showtext, setshowtext] = useState("")
    useEffect(()=>{
      const p = new Peer({
      initiator: location.hash === "#1",
      trickle: false,
      wrtc: wrtc
      // wrtc:nodeDatachannelPolyfill
    })
      setp(p)
    },[])
    
  // useEffect(()=>{
  if(peer){

    peer.on('error', err => console.log('error', err))

    peer.on('signal', data => {
      console.log('SIGNAL', JSON.stringify(data))
      setshowtext(JSON.stringify(data))
    })
    peer.on('connect', () => {
      console.log('CONNECT')
      peer.send('whatever' + Math.random())
    })

  // },[])
  }
  const handleJoin=() => {
    console.log(peer)
    peer.signal(JSON.parse(sdp))
  }


  const handleSend=()=> {
    
    peer.on('data', data => {
      console.log('data: ' + data)
    })
  }
  
    return (
      <div>
        {/* <h1>Simple Next.js App</h1> */}
        {/* <button onClick={handleConnect}>Connect</button> */}
        <br />
        {showtext}
        <textarea className='bg-black text-white' value={sdp} onChange={(e) => setSdp(e.target.value)} />
        <br />
        <button onClick={handleJoin}>Join</button>
        <br />
        <button onClick={handleSend}>Send</button>
      </div>
    )
    // return (
    //   <></>
    // )
  
}
