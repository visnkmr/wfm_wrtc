"use client"
import React, { useEffect } from 'react'
// import nodeDatachannelPolyfill from 'node-datachannel/polyfill';

import { useState } from 'react'
import Peer from 'simple-peer'
import { debug } from 'util';
export default function Home() {
    const [sdp, setSdp] = useState('')
    const [peer, setPeer] = useState(null)
    const [showtext, setshowtext] = useState("")
    const p = new Peer({
      initiator: location.hash === '#1',
      trickle: false,
      // wrtc:nodeDatachannelPolyfill
    })
  useEffect(()=>{

      p.on('error', err => console.log('error', err))
  
      p.on('signal', data => {
        console.log('SIGNAL', JSON.stringify(data))
        setshowtext(JSON.stringify(data))
      })
      p.on('connect', () => {
        console.log('CONNECT')
        p.send('whatever' + Math.random())
      })
  
    },[])
    const handleJoin=() => {
      p.signal(JSON.parse(sdp))
    }


    const handleSend=()=>p.on('data', data => {
      console.log('data: ' + data)
    })
  
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
