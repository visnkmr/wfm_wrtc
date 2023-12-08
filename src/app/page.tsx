"use client"
import { DataConnection, Peer } from 'peerjs';
import React, { useEffect } from 'react'

export default function Home() {
  // var peer:Peer;
  const [peerid,setpid] = React.useState("")
  const [messages,setm] = React.useState("")
  const [peer,setp] = React.useState<Peer>()
  var conn:DataConnection;
  //  function join() {
            useEffect(()=>{
              const p = new Peer()
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
                  conn = c
                  console.log("New connection : ")
                  console.log(conn)
  
                  // set the friend peer id we just got
                  var fpeerIDField = document.querySelector("#fpeerid")
                  fpeerIDField.value = c.peer
  
                  // handle message receive
                  conn.on('open', function () {
                      // Receive messages - receiver side
                      conn.on('data', function (data) {
                          console.log('Received', data);
                          setm("Friend : " + data)
                      });
                  });
              });
          // }
            }

        function connect() {
            var fpeerIDField = document.querySelector("#fpeerid")
            console.log("connecting to " + fpeerIDField.value)
            conn = peer.connect(fpeerIDField.value);
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
                conn.send(msg.value);
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

    <p>{messages}</p>
    </div>
  )
}
