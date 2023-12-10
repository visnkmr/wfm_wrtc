'use client'
import React, { useEffect } from 'react'
// import nodeDatachannelPolyfill from 'node-datachannel/polyfill';
import { useState } from 'react'
// import { createRequire } from 'module';
import wrtc from "wrtc"

import Peer from 'simple-peer'
import Ably from "ably"
import download from "js-file-download"
export enum DataType {
  FILE = 'FILE',
  OTHER = 'OTHER'

}
import { v4 as uuidv4 } from 'uuid';

import { kv,createClient } from "@vercel/kv";

export interface Data {
  dataType: DataType
  file?: Blob
  fileName?: string
  fileType?: string
  message?: string
}
export default function Home() {
  const kv = createClient({
    url: process.env.NEXT_PUBLIC_KV_REST_API_URL!,
    token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN!,
  });
// For the full code sample see here: https://github.com/ably/quickstart-js



  // const require = createRequire(import.meta.url);
  // console.log(require)
    const [sdp, setSdp] = useState('')
    const [channel, setchannel] = useState<Ably.Types.RealtimeChannelPromise>()
    const [offer, setoffer] = useState('')
    const [answer, setanswer] = useState('')
    const [amitheinitiator, setinitiator] = useState(true)
    const [peer, setp] = useState<Peer>(null)
    const [showtext, setshowtext] = useState("")
    const [fileList, setFileList] = React.useState<[File]>([])
  const [sendLoading, setSendLoading] = React.useState(false)
    useEffect(()=>{
      const p = new Peer({
      initiator: amitheinitiator,
      trickle: false,
      wrtc: wrtc
      // wrtc:nodeDatachannelPolyfill
    })
      setp(p)
    },[amitheinitiator])
    const ably = new Ably.Realtime.Promise(process.env.NEXT_PUBLIC_ABLY_K as string);
var onDataHandlerSetss = false;
//once an offer is instantiated
if(offer.trim().length!==0 ){

  useEffect(()=>{
    const fetchData = async () => {
      if(!onDataHandlerSetss){
        let ui4=uuidv4();
        await kv.set(ui4, offer);
        // console.log(uuidv4()); // Outputs a unique UUID
        const session = await kv.get(ui4);
        console.log(session)
        setshowtext(ui4)
        onDataHandlerSetss = true;
        await ably.connection.once('connected');
        console.log('Connected to Ably!');
        // // get the channel to subscribe to
        setchannel(ably.channels.get(ui4));
        // /*
        //   Subscribe to a channel.
        //   The promise resolves when the channel is attached
        //   (and resolves synchronously if the channel is already attached).
        // */
        //subscribe to know when answers are being sent
        await channel.subscribe('answer', (message) => {
          peer.signal(JSON.parse(message.data))
          console.log('Received a greeting message in realtime: ' + message.data)
        });
        // ably.close()
      }
      // const data = await getData(1);
      // setData(data);
   }
  
   fetchData();
    // async ()=>{
    // }
  },[offer])
}
//once decided on initiator
if(sdp.trim().length!==0)
{useEffect(()=>{
  const fetchData = async () => {
    var session;
      try{
        session = await kv.get(sdp);
        setinitiator(false)
        peer.signal(JSON.parse(session))
        //ably join the channel of sdp and close this ones channel
      setchannel(ably.channels.get(sdp));

      }
      catch(e){

      }
      
      
      // setshowtext(session)
 }

 fetchData();
  // async ()=>{
  // }
},[sdp])}
//send answer to initiator
if(answer.trim().length!==0)
{useEffect(()=>{
  const fetchData = async () => {
        //ably send the answer over the connection
        await channel.publish('answer', answer);

      // setshowtext(session)
 }

 fetchData();
  // async ()=>{
  // }
},[answer])}
  var onDataHandlerSet=false;
  useEffect(() => {
    
    if (peer) {
      // Check if 'data' event listener has already been set up
      if (!onDataHandlerSet) {
        peer.on('error', err => console.log('error', err))

        peer.on('signal', data => {
          console.log('SIGNAL', JSON.stringify(data))
          // setshowtext(JSON.stringify(data))
          if(data.type==="offer"){
            console.log("offer signal recieved")
            setoffer(JSON.stringify(data))
          }else if(data.type==="answer"){
            console.log("answer signal recieved")
            setanswer(JSON.stringify(data))
          }
        })
        peer.on('connect', () => {
          console.log('CONNECT')
          
        })
        peer.on('data', data => {
          console.log(data)
                    var gd=JSON.parse(data) as Data;
                    if (gd.dataType === DataType.FILE) {
                      console.log("recieved file")
                      download(gd.file || '', gd.fileName || "fileName", gd.fileType)
                  }
                  else{
    
                    console.log('Received', gd.message);
                    console.log('Received', JSON.stringify(gd));
                    // setm("Friend : " + gd.message)
                  }
        })
   
        // Mark 'data' event listener as set up
        onDataHandlerSet = true;
      }
    }
   }, [peer]);
  const handleJoin=() => {
    console.log(peer)
    peer.signal(JSON.parse(sdp))
  }


  const sendMessage=()=> {
    var msg = document.querySelector("#msg")
    console.log("sending message")
    // send message at sender or receiver side
    if (peer) {
      console.log(JSON.stringify(
        {
        dataType:DataType.OTHER,
        message: 
        'whatever' + Math.random()

      } as Data))
        // setm("Me : " + msg.value)
        peer.send(JSON.stringify(
          {
          dataType:DataType.OTHER,
          message: 
          'whatever' + Math.random()

        } as Data)
        );
        
    }
}
const handleUpload = async () => {
  if (fileList.length === 0) {
      console.log("Please select file")
      return
  }
  if (!peer) {
      console.log("Please select a connection")
      return
  }
  try {
      await setSendLoading(true);
      let file = fileList[0] as unknown as File;
      let blob = new Blob([file], {type: file.type});

      await peer.send(JSON.stringify({
          dataType: DataType.FILE,
          file: blob,
          fileName: file.name,
          fileType: file.type
      } as Data))
      await setSendLoading(false)
      console.log("Send file successfully")
  } catch (err) {
      await setSendLoading(false)
      console.log(err)
      console.log("Error when sending file")
  }
}
  
    return (
      <div className='grid grid-flow-row'>
        {/* <h1>Simple Next.js App</h1> */}
        {/* <button onClick={handleConnect}>Connect</button> */}
        <br />
        {showtext}
        <textarea className='bg-black text-white' value={sdp} onChange={(e) => setSdp(e.target.value)} />
        <br />
        <button onClick={handleJoin}>Join</button>
        <br />
        <button onClick={sendMessage}>Send</button>
        <br />
        <input
      type="file"
      onChange={(event) => {
        const file = event.target.files[0];
        if (file) {
          setFileList([file]);
        } else {
          setFileList([]);
        }
      }}
    />
    <button
      onClick={handleUpload}
      // loading={sendLoading}
      disabled={fileList.length === 0}
      style={{ marginTop: 16 }}
    >
      {sendLoading ? "Sending" : "Send"}
    </button>
      </div>
    )
    // return (
    //   <></>
    // )
  
}
