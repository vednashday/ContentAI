import React from 'react';

const PostPreview = ({ content, platform, image, user }) => {
  // Extract info from Firebase user object
  const username = user?.displayName || user?.email?.split('@')[0] || "User";
  const handle = `@${username.toLowerCase().replace(/\s/g, '')}`;
  
  // Get Google photo or a dynamic initial-based fallback
  const profilePic = user?.photoURL || `https://ui-avatars.com/api/?name=${username}&background=random&color=fff`;

  return (
    <div className="sticky top-10 w-full max-w-[340px] mx-auto animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 ml-1">
        Live Preview
      </div>
      
      {/* Smartphone Frame */}
      <div className="relative border-[8px] border-zinc-800 rounded-[3rem] bg-black aspect-[9/19] shadow-2xl overflow-hidden ring-1 ring-zinc-700/50">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-800 rounded-b-2xl z-20 flex items-center justify-center">
           <div className="w-8 h-1 bg-zinc-700 rounded-full" />
        </div>
        
        <div className="p-4 pt-12 h-full overflow-y-auto no-scrollbar bg-zinc-950">
          
          {/* TWITTER / X STYLE */}
          {platform === "Twitter" && (
            <div className="space-y-3">
              <div className="flex gap-3">
                {/* Profile Pic */}
                <img 
                  src={profilePic} 
                  className="w-10 h-10 rounded-full shrink-0 border border-zinc-800 object-cover" 
                  alt="Avatar" 
                />
                <div>
                  <div className="text-sm font-bold text-zinc-100">{username}</div>
                  <div className="text-xs text-zinc-500">{handle}</div>
                </div>
              </div>
              <p className="text-[14px] text-zinc-200 leading-normal whitespace-pre-wrap italic">
                {content || "Generating your tweet..."}
              </p>
              {image && (
                <div className="rounded-2xl border border-zinc-800 overflow-hidden">
                  <img src={image} className="w-full object-cover max-h-60" alt="Post attachment" />
                </div>
              )}
              <div className="flex gap-4 text-zinc-600 border-t border-zinc-900 pt-3">
                <div className="w-4 h-4 rounded-full border border-zinc-700" />
                <div className="w-4 h-4 rounded-full border border-zinc-700" />
                <div className="w-4 h-4 rounded-full border border-zinc-700" />
              </div>
            </div>
          )}

          {/* INSTAGRAM STYLE */}
          {platform === "Instagram" && (
            <div className="space-y-3 -mx-4 -mt-12">
              <div className="p-3 flex items-center gap-2 border-b border-zinc-900 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
                {/* Profile Pic with IG Ring */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[1.5px]">
                   <img 
                    src={profilePic} 
                    className="w-full h-full rounded-full border-2 border-black object-cover" 
                    alt="Avatar" 
                   />
                </div>
                <span className="text-[11px] font-bold text-white">{username}</span>
              </div>
              
              <div className="bg-zinc-900 aspect-square flex items-center justify-center border-y border-zinc-900">
                {image ? (
                   <img src={image} className="w-full h-full object-cover" alt="Insta" />
                ) : (
                   <div className="text-zinc-700 text-[10px] flex flex-col items-center gap-2">
                     <div className="w-8 h-8 border-2 border-zinc-800 rounded-lg" />
                     Waiting for image...
                   </div>
                )}
              </div>
              
              <div className="px-3 pb-4">
                <div className="flex gap-3 mb-3 text-zinc-400">
                   <div className="w-5 h-5 rounded-full border-2 border-current" />
                   <div className="w-5 h-5 rounded-full border-2 border-current" />
                </div>
                <p className="text-[12px] text-zinc-200 leading-snug">
                  <span className="font-bold mr-2">{username.toLowerCase()}</span>
                  {content || "Your caption will appear here..."}
                </p>
              </div>
            </div>
          )}

          {/* LINKEDIN STYLE */}
          {platform === "LinkedIn" && (
            <div className="bg-zinc-900/30 p-3 rounded-xl border border-zinc-800/50 space-y-3">
              <div className="flex gap-2">
                {/* Square-ish Profile Pic */}
                <img 
                  src={profilePic} 
                  className="w-10 h-10 rounded-sm bg-zinc-800 shrink-0 border border-zinc-700 object-cover" 
                  alt="Avatar" 
                />
                <div>
                  <div className="text-[11px] font-bold text-white">{username}</div>
                  <div className="text-[9px] text-zinc-500">AI Content Strategy • 1st</div>
                  <div className="text-[9px] text-zinc-600">2h • Edited</div>
                </div>
              </div>
              <p className="text-[12px] text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {content || "Your professional insight is loading..."}
              </p>
              {image && (
                <div className="rounded-lg border border-zinc-800 overflow-hidden">
                  <img src={image} className="w-full object-cover" alt="LinkedIn Asset" />
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PostPreview;