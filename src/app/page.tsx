'use client'
import React, { useEffect, useRef } from 'react'
// import nodeDatachannelPolyfill from 'node-datachannel/polyfill';
import { useState } from 'react'
// import { createRequire } from 'module';
// import wrtc from "wrtc"

import Peer from 'simple-peer'
import Ably from "ably"
import download from "js-file-download"
export enum MessageTypeDesc {
  FILE = 'FILE',
  OTHER = 'OTHER'

}
import { v4 as uuidv4 } from 'uuid';

import { createClient } from "@vercel/kv";
import Hpage from '../../Hpage'

export interface DataTypeDesc {
  dataType: MessageTypeDesc
  file?: Blob
  fileName?: string
  fileType?: string
  message?: string
}
const de=process.env.NEXT_PUBLIC_LOG_SHOW!;
export const dlfd =(m)=>{
  if(de){

    console.log(m)
  }
}
export default function Home() {
  const kvstore = createClient({
    url: process.env.NEXT_PUBLIC_KV_REST_API_URL!,
    token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN!,
  });
  var ably;
  // var runonce=useRef(false);
    const setupably=async()=>{
      ably = new Ably.Realtime.Promise(process.env.NEXT_PUBLIC_ABLY_K as string);
    await ably.connection.once('connected');
    
    console.debug('Connected to Ably!');}
    // useEffect(()=>{
      // if(!runonce.current){

        setupably()
// For the full code sample see here: https://github.com/ably/quickstart-js



  // const require = createRequire(import.meta.url);
  // dlfd(require)
    
    return (
      <Hpage ably={ably} kvstore={kvstore} dlfd={dlfd}/>
    )
  
}
