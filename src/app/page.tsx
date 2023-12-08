"use client"
import { DataConnection, LogLevel, Peer } from 'peerjs';
import React, { useEffect } from 'react'
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
  // var peer:Peer;
  const [peerid,setpid] = React.useState("")
  const [messages,setm] = React.useState("")
  const [peer,setp] = React.useState<Peer>()
  const [conn,setconn] = React.useState<DataConnection>()
  const [fileList, setFileList] = React.useState<[File]>([])
  const [sendLoading, setSendLoading] = React.useState(false)
  //  function join() {
            useEffect(()=>{
              const p = new Peer({
                debug: 3
              })
              setp(p)
              
            },[])
            const join =()=>console.log("Connecting..");
            if(peer){

              // when connection is created, handle the event - 
              peer.on('open', function (id) {
                  console.log('Connected to Signaling Server ID : ' + id);
                  // set the input value
                  setpid(id)
              });
  
              peer.on('connection', function (c) {
                  setconn(c)
                  console.log("New connection : ")
                  console.log(conn)
  
                  // set the friend peer id we just got
                  var fpeerIDField = document.querySelector("#fpeerid")
                  fpeerIDField.value = c.peer
  
                  
              });
          // }
            }
            var onDataHandlerSet=false;
            useEffect(() => {
              if (conn) {
                // Check if 'data' event listener has already been set up
                if (!onDataHandlerSet) {
                   // handle message receive
                  conn.on('open', function () {
                  });
                  // Receive messages - receiver side
                  conn.on('data', function (data) {
                    console.log(conn)
                    var gd=data as Data;
                    if (gd.dataType === DataType.FILE) {
                      console.log("recieved file")
                      download(gd.file || '', gd.fileName || "fileName", gd.fileType)
                  }
                  else{
    
                    console.log('Received', gd.message);
                    setm("Friend : " + gd.message)
                  }
                  });
             
                  // Mark 'data' event listener as set up
                  onDataHandlerSet = true;
                }
              }
             }, [conn]);
            // if(conn){
             
            // }

        function connect() {
            var fpeerIDField = document.querySelector("#fpeerid")
            console.log("connecting to " + fpeerIDField.value)
            setconn(peer.connect(fpeerIDField.value));
            console.log(conn)
            // open event called when connection gets created
            // conn.on('open', function () {
            //     console.log("connected")
            //     // Receive messages - sender side
            //     conn.on('data', function (data) {
            //         console.log('Received', data);
            //         printMsg("Friend : " + data)
            //     });
            // });
        }

        function sendMessage() {
            var msg = document.querySelector("#msg")
            console.log("sending message")
            // send message at sender or receiver side
            if (conn && conn.open) {
                setm("Me : " + msg.value)
                conn.send({
                  dataType:DataType.OTHER,
                  message:msg.value
                } as Data);
                
            }
        }
        const handleUpload = async () => {
          if (fileList.length === 0) {
              console.log("Please select file")
              return
          }
          if (!conn) {
              console.log("Please select a connection")
              return
          }
          try {
              await setSendLoading(true);
              let file = fileList[0] as unknown as File;
              let blob = new Blob([file], {type: file.type});
  
              await conn.send({
                  dataType: DataType.FILE,
                  file: blob,
                  fileName: file.name,
                  fileType: file.type
              } as Data)
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
    <p>{peerid}</p>
    <button onClick={join}>Join</button>

    <input className='bg-white text-black' type="text" id="fpeerid" placeholder="Peer ID"/> 
    <button onClick={connect}>Connect</button>
    <input className='bg-white text-black' type="text" id="msg" placeholder="Message.."/>
    <button id="send" onClick={sendMessage}>Send</button>

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

    <p>{messages}</p>
    </div>
  )
}
