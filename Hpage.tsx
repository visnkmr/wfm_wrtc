'use client'
import React, { useEffect, useRef } from 'react'
import axios from "axios";
import './src/app/globals.css'

// import nodeDatachannelPolyfill from 'node-datachannel/polyfill';
import { useState } from 'react'
// import { createRequire } from 'module';
// import wrtc from "wrtc"

import Peer from 'simple-peer'
// import Ably from "ably"
import download from "js-file-download"
export enum MessageTypeDesc {
  FILE = 'FILE',
  OTHER = 'OTHER'

}
function submittodb(id:string,listtosave:object){
  console.log("whenhere:\n"+JSON.stringify(listtosave))

  return axios.request({
    url: `https://listallfrompscale.vercel.app/api/putredis/`,
    method: 'POST',
    data: {id: id, value: JSON.stringify(listtosave)},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
})
// .then(response => {
//   console.log(response)
//       // value="\nsaved selected tab(s)\t";
//       // +title.substring(0,30);
//       // response.json()
//     }
//   )
// // .then(data => {
// //     // Do something with the response data
// //     console.log(data);
// // })
// .catch(error => {
//     // Handle any errors
//     console.error(error);
// });
}
function getfromdb(id:string){
  // console.log("whenhere:\n"+JSON.stringify(listtosave))

   return axios.request({
    url: `https://listallfrompscale.vercel.app/api/getvalue/${id}`,
    method: 'GET',
    // data: {id: id, value: JSON.stringify(listtosave)},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
})
// .then(response => {
//   console.log(JSON.parse(response.data.data))
//       // value="\nsaved selected tab(s)\t";
//       // +title.substring(0,30);
//       // response.json()
//     }
//   )
// .then(data => {
//     // Do something with the response data
//     console.log(data);
// })
// .catch(error => {
//     // Handle any errors
//     console.error(error);
// });
}
import { v4 as uuidv4 } from 'uuid';

import { createClient } from "@vercel/kv";

export interface DataTypeDesc {
  dataType: MessageTypeDesc
  file?: Blob
  fileName?: string
  fileType?: string
  message?: string
}
const de=true;
export const dlfd =(m)=>{
  if(de){

    console.log(m)
  }
}
export default function Hpage(){
    const [sdp, setSdp] = useState('')
    // const [channel, setchannel] = useState<Ably.Types.RealtimeChannelPromise>()
    // var channel:Ably.Types.RealtimeChannelPromise;
    // const [offer, setoffer] = useState('')
    // const [answer, setanswer] = useState('')
    // const [amitheinitiator, setinitiator] = useState(true)
    // const [peer, setp] = useState<Peer>(null)
    var savepeer=useRef();
    var peer:Peer=savepeer.current;
    var ui4=""
    // const [showtext, setshowtext] = useState("")
   dlfd(peer)
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
  
        // runonce.current=true;
      // }
    // },[])

// const setupchannel=()=>{
//   dlfd("setup channel name "+ui4)

//   channel=(ably.channels.get(ui4));
// }

// var onDataHandlerSetss = false;
//once an offer is instantiated
// const offerset=(offer)=>{

//   // if(offer.trim().length!==0 ){
//     dlfd("setting offer on redis")
    // useEffect(()=>{
      const setofferdata = async (recdata) => {
        // if(!onDataHandlerSetss){
          ui4=uuidv4();
          dlfd(ui4)
          // dlfd(recdata)
          await submittodb(ui4, recdata);
          // await getoffer()
          // dlfd(uuidv4()); // Outputs a unique UUID
          // const session = await kvstore.get(ui4);
          // dlfd(session)
          dlfd("initiator uid---->"+ui4)
          // dlfd(ably)
          // onDataHandlerSetss = true;
          //  try{
            
            
          // }
          // catch(e){
          //   dlfd("FAILED")
          //   dlfd(e)
          // }
            // // get the channel to subscribe to
            // setupchannel()
            // /*
            //   Subscribe to a channel.
            //   The promise resolves when the channel is attached
            //   (and resolves synchronously if the channel is already attached).
            // */
            //subscribe to know when answers are being sent
            // await channel.subscribe('answer', (message) => {
            //   answerrecieved(message.data)
            //   dlfd('Received a greeting message in realtime: ' + message.data)
            // });
          // ably.close()
        // }
        // const data = await getData(1);
        // setData(data);
     }

    //  const answerrecieved=(answer)=>{
    //   dlfd("answerr recieved--------->"+answer)
    //           peer.signal(JSON.parse(answer))
      
    //  }
    
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
    dlfd("sent answer to db")
    await submittodb(ui4, answer);
    // setupchannel()
        //ably send the answer over the connection
    // await channel.publish('answer', answer);

      // setshowtext(session)
 }
const getoffer=async()=>{
  console.log(ui4)
  var resp=await getfromdb(ui4);

// Wait for the axios request to complete
var response = await resp;

// Access the data property of the response
  var offer = response.data.data;
  dlfd("got offer"+JSON.parse(offer))
    peer.signal(JSON.parse(offer))

}
const getanswer=async()=>{
  console.log(ui4)
  var resp=await getfromdb(ui4);

// Wait for the axios request to complete
var response = await resp;

// Access the data property of the response
  var answer = response.data.data;
  dlfd("answerr recieved--------->"+answer)
  peer.signal(JSON.parse(answer))
    // peer.signal(offer)

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
          peer.on('error', err => dlfd('error'+ err))
  
          peer.on('signal', data => {
            let recdata=JSON.stringify(data)
            dlfd('SIGNAL'+ recdata)
            // setshowtext(JSON.stringify(data))
            if(data.type==="offer"){
              dlfd("offer signal recieved")
              // dlfd(recdata)
              // setoffer(recdata)
              // dlfd(offer)
              setofferdata(recdata)
            }else if(data.type==="answer"){
              dlfd("answer signal recieved")
              setanswerdata(recdata)
              dlfd((peer))
            }
          })
          peer.on('connect', () => {
            dlfd('CONNECT')
            // ably.close()
            
          })
          peer.on('data', data => {
            dlfd(data)
                      var gd=JSON.parse(data) as DataTypeDesc;
                      if (gd.dataType === MessageTypeDesc.FILE) {
                        dlfd("recieved file")
                        download(gd.file || '', gd.fileName || "fileName", gd.fileType)
                    }
                    else{
      
                      dlfd('Received'+ gd.message);
                      // dlfd('Received', JSON.stringify(gd));
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
    savepeer.current=startconn(false)
    peer=savepeer.current
    dlfd(JSON.stringify(peer))
    initpeer()
    // dlfd("offer got from kvstore----->"+sdp)
    
    ui4=sdp
    // setupchannel()
    
    getoffer()
  }


  const sendMessage=()=> {
    dlfd("sending message")
    // send message at sender or receiver side
    if (peer) {
      let sm=(JSON.stringify(
        {
        dataType:MessageTypeDesc.OTHER,
        message: 
        'whatever' + Math.random()

      } as DataTypeDesc))
        // setm("Me : " + msg.value)
        dlfd(sm)
        peer.send(sm)
        
    }
}
const [fileList, setFileList] = React.useState<[File]>([])
    const [sendLoading, setSendLoading] = React.useState(false)
    const handleUpload = async () => {
        if(fileList){
      
          if (fileList.length === 0) {
              dlfd("Please select file")
              return
          }
          dlfd(peer)
          if (!peer) {
              dlfd("Please select a connection")
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
              dlfd("Send file successfully")
          } catch (err) {
              await setSendLoading(false)
              dlfd(err)
              dlfd("Error when sending file")
          }
        }
      }
        const addfile=(event) => {
          console.log(peer)
          event.preventDefault();
          const file = event.target.files[0];
          if (file) {
            setFileList([file]);
          } else {
            setFileList([]);
          }
        }
  
    return (
      <div className='grid grid-flow-row'>
        {/* <h1>Simple Next.js App</h1> */}
        {/* <button onClick={handleConnect}>Connect</button> */}
        <button onClick={()=>{
          savepeer.current=startconn(true)
          peer=savepeer.current
          initpeer()
          }}>start</button>
        <br />
        {/* {showtext} */}
        <textarea className='bg-black text-white' value={sdp} onChange={(e) => setSdp(e.target.value)} />
        <br />
        <button onClick={handleJoin}>Join</button>
        <br />
        <button onClick={getanswer}>Get Answer</button>
        <br />
        <button onClick={sendMessage}>Send</button>
        <br />
        {/* <Fileup peer={savepeer.current}/> */}
        <input
          type="file"
          onChange={addfile}
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
}