'use client'
import React, { useEffect, useRef } from 'react'
import axios from "axios";
// import './src/app/globals.css'

// import nodeDatachannelPolyfill from 'node-datachannel/polyfill';
import { useState } from 'react'
// import { createRequire } from 'module';
// import wrtc from "wrtc"

import Peer from 'simple-peer'
// import Ably from "ably"
import download from "js-file-download"
import SendMessage from './SendMessage';
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
// import { v4 as uuidv4 } from 'uuid';

// import { createClient } from "@vercel/kv";

interface DataTypeDesc {
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
    var showornot=useRef(false)
    var [readyforconn,setr]=useState(false)
    var [readytosend,setrts]=useState(false)
    let [mh,setmh]=useState(Array<string>)

    var [joinoth,setjoth]=useState(false)
    var peer:Peer=savepeer.current;
    var saveui4=useRef("");
    // var ui4=saveui4.current;
    const [showtext, setshowtext] = useState("")
  //  dlfd(peer)
    const startconn=(amitheinitiator)=>{
      // useEffect(()=>{
      return new Peer({
      initiator: amitheinitiator,
      trickle: false,
      objectMode:true,
      
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
          let randomNumber = Math.floor(Date.now() % 10000);
          console.log(randomNumber);
          saveui4.current=randomNumber.toString();
          dlfd(saveui4.current)
          // dlfd(recdata)
          await submittodb(saveui4.current, recdata);
          showornot.current=true
          // await getoffer()
          // dlfd(uuidv4()); // Outputs a unique UUID
          // const session = await kvstore.get(ui4);
          // dlfd(session)
          setshowtext(saveui4.current)
          dlfd("initiator uid---->"+saveui4.current)
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
    await submittodb(saveui4.current, answer);
    dlfd("sent answer to db")
    setr(true)
    console.log(readyforconn)
    // setupchannel()
        //ably send the answer over the connection
    // await channel.publish('answer', answer);

      // setshowtext(session)
 }
const getoffer=async()=>{
  console.log(saveui4.current)
  var resp=await getfromdb(saveui4.current);

// Wait for the axios request to complete
var response = await resp;

// Access the data property of the response
  var offer = response.data.data;
  dlfd("got offer"+JSON.parse(offer))
    peer.signal(JSON.parse(offer))

}
const getanswer=async()=>{
  console.log(saveui4.current)
  var resp=await getfromdb(saveui4.current);

// Wait for the axios request to complete
var response = await resp;

// Access the data property of the response
  var answer = response.data.data;
  dlfd("answerr recieved--------->"+answer)
  peer.signal(JSON.parse(answer))
    // peer.signal(offer)

}
interface fileinfo{
  fileType:string,
  fileName:string,
  fileSize:number

}
//  fetchData();
//   // async ()=>{
//   // }
// },[answer])}
  // var onDataHandlerSet=false;
  // useEffect(() => {
    let receiveBuffer=[]
    let receivedSize=0
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
            setrts(true)

            // ably.close()
            
          })
          
          var e:fileinfo;
          peer.on('data', data => {
            if (typeof data.byteLength !== "undefined") {
              let percentage = 0;
              receiveBuffer.push(data);
              receivedSize += data.byteLength;
              percentage = ((receivedSize / e.fileSize) * 100).toFixed(3);
              peer.send(
                JSON.stringify({
                  type: "progress",
                  value: percentage
                })
              );
              if (e.fileSize !== 0 && e.fileName) {
                if (receivedSize == e.fileSize) {
                  const received = new Blob(receiveBuffer);
                  receiveBuffer = [];
                  download(received || '', e.fileName || "fileName", e.fileType)
                }
              }
            } else {
              try {
                if (isJSON(data)) {
                  var sData = JSON.parse(data);
      
                  if (sData.type === "progress") {
                    console.log("progressing "+sData.value)
                  }
                  else if (sData.type === "fileinfo") {
                    dlfd(JSON.stringify(sData.value))
                    e=JSON.parse(sData.value)

                  }
                  else if (sData.type === "message") {
                    // dlfd(JSON.stringify(sData.value))
                    let newmh=[...mh,sData.value]
                    setmh(newmh)
                  }
                }
              } catch (error) {
                console.log("TryCatch", error);
              }
            }
          })
      }
    //  }, [peer]);
    }
    const isJSON = str => {
      try {
        return JSON.parse(str) && !!str;
      } catch (e) {
        return false;
      }
    };
    
  const handleJoin=() => {
    savepeer.current=startconn(false)
    peer=savepeer.current
    dlfd(JSON.stringify(peer))
    initpeer()
    // dlfd("offer got from kvstore----->"+sdp)
    
    saveui4.current=sdp
    // setupchannel()
    
    getoffer()
  }


  const sendMessage=()=> {
    dlfd("sending message")
    // send message at sender or receiver side
    if (peer) {
      let sm=(JSON.stringify(
        {
        type:"message",
        value: 
        'whatever' + Math.random()

      }))
        // setm("Me : " + msg.value)
        dlfd(sm)
        peer.send(sm)
        
    }
}
const joinothenable=()=>{
  setjoth(true)
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
              
              sendData(file)
        
              // await peer.send({
              //   dataType: MessageTypeDesc.FILE,
              //   file: blob,
              //   fileName: file.name,
              //   fileType: file.type
              // })
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
        let sendBuffer = [];

        const sendData = (file) => {
          if (file.size === 0) {
            dlfd("empty file")
          }
          const chunkSize = 32000;
          var fileReader = new FileReader();
          let offset = 0;
          let fi:fileinfo={
            fileType: file.type,
            fileName: file.name,
            fileSize: file.size
          }
          peer.send(JSON.stringify({
            type:"fileinfo",
            value:JSON.stringify(fi)
          }))

          sendBuffer=[]      
          // wRTCTransferPaused = false;
          fileReader.addEventListener("error", error =>
            console.error("Error reading file:", error)
          );
          fileReader.addEventListener("abort", event =>
            console.log("File reading aborted:", event)
          );
          fileReader.addEventListener("load", e => {
            sendChunk(e.target.result);
            offset += e.target.result.byteLength;
            if (offset < file.size) {
              readSlice(offset);
            }
          });
          const readSlice = o => {
            const slice = file.slice(offset, o + chunkSize);
            fileReader.readAsArrayBuffer(slice);
          };
          readSlice(0);
        };
        const sendChunk = (data) => {
          peer.send(data)
          // if (wRTCTransferPaused) {
          //   return;
          // }
      
        };
    return (
      <div className='grid grid-flow-row'>
        {/* <h1>Simple Next.js App</h1> */}
        {/* <button onClick={handleConnect}>Connect</button> */}
        <div className='grid grid-flow-col'>

        <button onClick={()=>{
          savepeer.current=startconn(true)
          peer=savepeer.current
          initpeer()
        }}>Start Session</button>
        <br/>
        <button onClick={joinothenable}>Join Session </button>
        </div>
        <br />
        {showtext}
        <br />
        <div className={joinoth ? "block" : "hidden"}>

        <textarea placeholder="Enter code here" className='bg-black text-white' value={sdp} onChange={(e) => setSdp(e.target.value)} />
        <br />
        <button onClick={handleJoin}>Join Session</button>
        </div>
        <br />
        <div className={readyforconn ? "block" : "hidden"}>Ready for Connection</div>
        <br />
        <button className={showornot.current ? "block" : "hidden"} onClick={getanswer}>Connect</button>
        <br />
        <div className={readytosend ? "block" : "hidden"}>

        <button onClick={sendMessage}>Send</button>
        <br/>
        <p>{mh}</p>
        <SendMessage peer={savepeer.current}/>
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
      </div>
    )
}
