import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import PostPreview from "../components/PostPreview";

export default function Dashboard({ user }) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Twitter");
  const [tone, setTone] = useState("Professional");
  const [generatedPost, setGeneratedPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const API = import.meta.env.VITE_BACKEND_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${API}/posts/${user.uid}`)
      .then((res) => setPosts(res.data))
      .catch(() => console.error("Failed to load posts"));
  }, [user]);

  const handleGenerate = async () => {
    if (!topic) {
      alert("Please enter a topic first!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/generate`, {
        topic,
        platform,
        tone,
        userId: user.uid,
        image,
      });
      const newPost = res.data;
      setGeneratedPost(newPost.content);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      
    } catch (err) {
      console.error("Generation error:", err);
      alert("Failed to generate post. Check if your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

const handleDelete = async (id) => {
  // Confirm before deleting
  if (!window.confirm("Are you sure you want to delete this post?")) return;

  try {
    await axios.delete(`${API}/posts/${id}`);
    // Update local state to remove the post immediately
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete post.");
  }
};

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-10 font-sans text-zinc-100">
      {/* 2-Column Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Input & History (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900/40">
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                  GenAI Post Generator
                </h1>
                <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1 font-semibold">
                  Creative Engine
                </p>
              </div>
              <button
                onClick={() => signOut(auth)}
                className="px-4 py-2 text-xs font-bold border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-all active:scale-95 text-zinc-400 hover:text-white"
              >
                Logout
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">
                  Upload Visual Asset
                </label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                  <label htmlFor="image-upload" className="cursor-pointer px-5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs font-semibold hover:bg-zinc-700 transition-all">
                    {imagePreview ? "Change Image" : "Choose Image"}
                  </label>
                  {imagePreview && (
                    <img src={imagePreview} className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20" alt="Preview" />
                  )}
                </div>
              </div>

              {/* Topic Input */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">
                  What's the topic?
                </label>
                <input
                  className="w-full p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-zinc-700"
                  placeholder="e.g. The future of AI in web development..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              {/* Selectors */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Platform</label>
                  <select
                    className="w-full p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="Twitter">Twitter / X</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                  </select>
                </div>
                <div className="flex-1 space-y-3">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Tone</label>
                  <select
                    className="w-full p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option value="Professional">Professional</option>
                    <option value="Casual">Casual</option>
                    <option value="Viral">Viral</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-zinc-200 disabled:opacity-50 transition-all shadow-xl shadow-white/5 active:scale-[0.98]"
              >
                {loading ? <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin mx-auto" /> : "Generate Magic"}
              </button>
            </div>
          </div>

          {/* History Section */}
          <div className="space-y-6 pt-4">
            <h2 className="text-lg font-bold flex items-center gap-3 ml-2">
              Saved History
              <span className="bg-zinc-800 text-zinc-500 text-[10px] px-2 py-1 rounded-md">{posts.length}</span>
            </h2>
            <div className="grid gap-6">
              {posts.map((p) => (
                <div key={p._id} className="group p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl hover:border-zinc-700 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">
                      {p.platform}
                    </span>
                    <button onClick={() => copyToClipboard(p.content, p._id)} className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors">
                      {copiedId === p._id ? "Copied!" : "Copy Text"}
                    </button>
                    <button 
                      onClick={() => handleDelete(p._id)}
                      className="text-zinc-600 hover:text-red-400 transition-colors"
                      title="Delete Post"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  {p.image && (
                    <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-800 bg-black/20">
                      <img src={p.image} className="w-full h-auto max-h-[300px] object-contain block mx-auto transition-transform duration-700 group-hover:scale-[1.02]" alt="Post" />
                    </div>
                  )}
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{p.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Preview (4 Cols - Sticky) */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-10 hidden lg:block">
          <PostPreview 
            content={generatedPost} 
            platform={platform} 
            image={imagePreview} 
            user={user} 
          />
        </div>

      </div>
    </div>
  );
}