'use client'
import dynamic from 'next/dynamic'

// import nodeDatachannelPolyfill from 'node-datachannel/polyfill';
const Sp =dynamic(()=>import ("./sp"));
export default function Home() {
    return (
      <>
      <Sp/>
      </>
    )
}
