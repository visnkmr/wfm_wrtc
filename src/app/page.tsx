'use client'
import React, { useEffect } from 'react'
// import nodeDatachannelPolyfill from 'node-datachannel/polyfill';
import { useState } from 'react'
// import { createRequire } from 'module';
import wrtc from "wrtc"
import Peer from 'simple-peer'
import { debug } from 'util';
import download from "js-file-download"
export enum DataType {
  FILE = 'FILE',
  OTHER = 'OTHER'

}
export interface Data {
  dataType: DataType
  file?: Blob
  fileName?: string
  fileType?: string
  message?: string
}
export default function Home() {
  // const require = createRequire(import.meta.url);
  console.log(require)
    const [sdp, setSdp] = useState('')
    const [peer, setp] = useState<Peer>(null)
    const [showtext, setshowtext] = useState("")
    const [fileList, setFileList] = React.useState<[File]>([])
  const [sendLoading, setSendLoading] = React.useState(false)
    useEffect(()=>{
      const p = new Peer({
      initiator: location.hash === "#1",
      trickle: false,
      wrtc: wrtc
      // wrtc:nodeDatachannelPolyfill
    })
      setp(p)
    },[])
    
  var onDataHandlerSet=false;
  useEffect(() => {
    
    if (peer) {
      // Check if 'data' event listener has already been set up
      if (!onDataHandlerSet) {
        peer.on('error', err => console.log('error', err))

        peer.on('signal', data => {
          console.log('SIGNAL', JSON.stringify(data))
          setshowtext(JSON.stringify(data))
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
