'use client'
import React, { useEffect, useRef } from 'react'
// import nodeDatachannelPolyfill from 'node-datachannel/polyfill';
import { useState } from 'react'
// import { createRequire } from 'module';
// import wrtc from "wrtc"

import Peer from 'simple-peer'
import Ably from "ably"
import download from "js-file-download"
enum MessageTypeDesc {
  FILE = 'FILE',
  OTHER = 'OTHER'

}
import { v4 as uuidv4 } from 'uuid';

import { createClient } from "@vercel/kv";

interface DataTypeDesc {
  dataType: MessageTypeDesc
  file?: Blob
  fileName?: string
  fileType?: string
  message?: string
}
export default function Home() {
  const kvstore = createClient({
    url: process.env.NEXT_PUBLIC_KV_REST_API_URL!,
    token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN!,
  });
// For the full code sample see here: https://github.com/ably/quickstart-js



  // const require = createRequire(import.meta.url);
  // console.log(require)
    const [sdp, setSdp] = useState('')
    // const [channel, setchannel] = useState<Ably.Types.RealtimeChannelPromise>()
    var channel:Ably.Types.RealtimeChannelPromise;
    // const [offer, setoffer] = useState('')
    // const [answer, setanswer] = useState('')
    // const [amitheinitiator, setinitiator] = useState(true)
    // const [peer, setp] = useState<Peer>(null)
    var peer:Peer;
    var ui4=""
    // const [showtext, setshowtext] = useState("")
    const [fileList, setFileList] = React.useState<[File]>([])
    const [sendLoading, setSendLoading] = React.useState(false)
    const startconn=(amitheinitiator)=>{
      // useEffect(()=>{
      return new Peer({
      initiator: amitheinitiator,
      trickle: false,
      // wrtc: wrtc
      // wrtc:nodeDatachannelPolyfill
    })
      // setp(p)
    // },[amitheinitiator])
  }
  var ably;
  // var runonce=useRef(false);
    const setupably=async()=>{
      ably = new Ably.Realtime.Promise(process.env.NEXT_PUBLIC_ABLY_K as string);
    await ably.connection.once('connected');
    
    console.log('Connected to Ably!');}
    useEffect(()=>{
      // if(!runonce.current){

        setupably()
        // runonce.current=true;
      // }
    })

const setupchannel=()=>{
  console.log("setup channel name "+ui4)

  channel=(ably.channels.get(ui4));
}

var onDataHandlerSetss = false;
//once an offer is instantiated
// const offerset=(offer)=>{

//   // if(offer.trim().length!==0 ){
//     console.log("setting offer on redis")
    // useEffect(()=>{
      const setofferdata = async (recdata) => {
        // if(!onDataHandlerSetss){
          ui4=uuidv4();
          console.log(ui4)
          // console.log(recdata)
          await kvstore.set(ui4, recdata);
          // console.log(uuidv4()); // Outputs a unique UUID
          // const session = await kvstore.get(ui4);
          // console.log(session)
          console.log("initiator uid---->"+ui4)
          console.log(ably)
          // onDataHandlerSetss = true;
          //  try{
            
            
          // }
          // catch(e){
          //   console.log("FAILED")
          //   console.log(e)
          // }
            // // get the channel to subscribe to
            setupchannel()
            // /*
            //   Subscribe to a channel.
            //   The promise resolves when the channel is attached
            //   (and resolves synchronously if the channel is already attached).
            // */
            //subscribe to know when answers are being sent
            await channel.subscribe('answer', (message) => {
              answerrecieved(message.data)
              console.log('Received a greeting message in realtime: ' + message.data)
            });
          // ably.close()
        // }
        // const data = await getData(1);
        // setData(data);
     }

     const answerrecieved=(answer)=>{
      console.log("answerr recieved--------->"+answer)
              peer.signal(JSON.parse(answer))
      
     }
    
    //  fetchData(offer);
      // async ()=>{
      // }
    // },[offer])
  // }
// }
// //once decided on initiator
// if(sdp.trim().length!==0)
// {useEffect(()=>{
//   const fetchData = async () => {
//     var session;
//       try{
//         session = await kv.get(sdp);
//         setinitiator(false)
//         peer.signal(JSON.parse(session))
//         //ably join the channel of sdp and close this ones channel
//       setchannel(ably.channels.get(sdp));

//       }
//       catch(e){

//       }
      
      
//       // setshowtext(session)
//  }

//  fetchData();
//   // async ()=>{
//   // }
// },[sdp])}
// //send answer to initiator
// if(answer.trim().length!==0)
// {useEffect(()=>{
  const setanswerdata = async (answer) => {
    setupchannel()
        //ably send the answer over the connection
    await channel.publish('answer', answer);

      // setshowtext(session)
 }
const getoffer=async()=>{
  var offer=await kvstore.get(ui4);
  console.log("got offer"+JSON.stringify(offer))
    peer.signal(offer)

}
//  fetchData();
//   // async ()=>{
//   // }
// },[answer])}
  // var onDataHandlerSet=false;
  // useEffect(() => {
    const initpeer=()=>{

      if (peer) {
        // Check if 'data' event listener has already been set up
        // if (!onDataHandlerSet) {
          peer.on('error', err => console.log('error', err))
  
          peer.on('signal', data => {
            let recdata=JSON.stringify(data)
            console.log('SIGNAL', recdata)
            // setshowtext(JSON.stringify(data))
            if(data.type==="offer"){
              console.log("offer signal recieved")
              // console.log(recdata)
              // setoffer(recdata)
              // console.log(offer)
              setofferdata(recdata)
            }else if(data.type==="answer"){
              console.log("answer signal recieved")
              setanswerdata(recdata)
            }
          })
          peer.on('connect', () => {
            console.log('CONNECT')
            ably.close()
            
          })
          peer.on('data', data => {
            console.log(data)
                      var gd=JSON.parse(data) as DataTypeDesc;
                      if (gd.dataType === MessageTypeDesc.FILE) {
                        console.log("recieved file")
                        download(gd.file || '', gd.fileName || "fileName", gd.fileType)
                    }
                    else{
      
                      console.log('Received', gd.message);
                      // console.log('Received', JSON.stringify(gd));
                      // setm("Friend : " + gd.message)
                    }
          })
     
          // Mark 'data' event listener as set up
          // onDataHandlerSet = true;
        // }
      }
    //  }, [peer]);
    }
    
  const handleJoin=() => {
    peer=startconn(false)
    console.log(peer)
    initpeer()
    // console.log("offer got from kvstore----->"+sdp)
    
    ui4=sdp
    setupchannel()
    
    getoffer()
  }


  const sendMessage=()=> {
    console.log("sending message")
    // send message at sender or receiver side
    if (peer) {
      let sm=(JSON.stringify(
        {
        dataType:MessageTypeDesc.OTHER,
        message: 
        'whatever' + Math.random()

      } as DataTypeDesc))
        // setm("Me : " + msg.value)
        console.log(sm)
        peer.send(sm)
        
    }
}
const handleUpload = async () => {
  if(fileList){

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
            dataType: MessageTypeDesc.FILE,
            file: blob,
            fileName: file.name,
            fileType: file.type
        } as DataTypeDesc))
        await setSendLoading(false)
        console.log("Send file successfully")
    } catch (err) {
        await setSendLoading(false)
        console.log(err)
        console.log("Error when sending file")
    }
  }
}
  
    return (
      <div className='grid grid-flow-row'>
        {/* <h1>Simple Next.js App</h1> */}
        {/* <button onClick={handleConnect}>Connect</button> */}
        <button onClick={()=>{
          peer=startconn(true)
          initpeer()
          }}>start</button>
        <br />
        {/* {showtext} */}
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
