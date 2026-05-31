
import {useState,useEffect} from 'react';

const layouts={ '2x2':2,'3x3':3,'4x4':4 };

export default function App(){
 const [channels,setChannels]=useState(()=>JSON.parse(localStorage.getItem('channels')||'["shroud","lirik"]'));
 const [layout,setLayout]=useState(localStorage.getItem('layout')||'2x2');
 const [channel,setChannel]=useState('');

 useEffect(()=>localStorage.setItem('channels',JSON.stringify(channels)),[channels]);
 useEffect(()=>localStorage.setItem('layout',layout),[layout]);

 const add=()=>{
  if(channel.trim()) setChannels([...channels,channel.trim()]);
  setChannel('');
 };

 return <div className="app">
  <div className="workspace">
   <div className="toolbar">
    {Object.keys(layouts).map(l=><button key={l} onClick={()=>setLayout(l)}>{l}</button>)}
   </div>
   <div className="grid" style={{gridTemplateColumns:`repeat(${layouts[layout]},1fr)`}}>
    {channels.map(c=>
      <div className="tile" key={c}>
       <iframe src={`https://player.twitch.tv/?channel=${c}&parent=localhost&muted=true`} allowFullScreen/>
      </div>
    )}
   </div>
  </div>

  <aside className="sidebar">
   <h1>TwitchTheater Pro</h1>

   <div className="card">
    <input value={channel} onChange={e=>setChannel(e.target.value)} placeholder="streamer"/>
    <button onClick={add}>Add Stream</button>
   </div>

   <div className="card">
    <h3>Channels</h3>
    {channels.map((c,i)=>
      <div className="row" key={c}>
       <span>{c}</span>
       <button onClick={()=>setChannels(channels.filter((_,x)=>x!==i))}>×</button>
      </div>
    )}
   </div>

   <div className="card">
    <h3>Roadmap Included</h3>
    <ul>
      <li>Layouts</li>
      <li>Local storage</li>
      <li>Stream manager</li>
      <li>OBS friendly</li>
      <li>Multi-chat placeholder</li>
    </ul>
   </div>
  </aside>
 </div>
}
