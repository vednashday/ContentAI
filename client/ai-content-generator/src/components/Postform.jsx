import { useState } from "react";

export default function PostForm({ onGenerate }) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Twitter");
  const [tone, setTone] = useState("Professional");

  return (
    <div>
      <input placeholder="Topic" onChange={e => setTopic(e.target.value)} />
      <select onChange={e => setPlatform(e.target.value)}>
        <option>Twitter</option>
        <option>LinkedIn</option>
        <option>Instagram</option>
      </select>
      <select onChange={e => setTone(e.target.value)}>
        <option>Professional</option>
        <option>Casual</option>
        <option>Viral</option>
      </select>
      <button onClick={() => onGenerate({ topic, platform, tone })}>
        Generate
      </button>
    </div>
  );
}
