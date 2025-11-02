import React, { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

const formatNumber = (n) => Intl.NumberFormat('en', { notation: 'compact' }).format(n);

const CommentsDrawer = ({ open, onClose, item }) => {
  if (!open) return null;
  const mockComments = Array.from({ length: 8 }).map((_, i) => ({
    user: ['nova', 'iris', 'flux', 'zen'][i % 4],
    text: ['Incredibile!', 'Che vibes ✨', 'Molto fluido', 'Wow, 3D 🔥'][i % 4],
  }));
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0b0f17]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="font-semibold text-white">Commenti • {formatNumber(item?.comments || 0)}</div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10"> <X className="h-5 w-5 text-white/80" /> </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-8rem)]">
          {mockComments.map((c, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4]" />
              <div>
                <div className="text-white font-medium">@{c.user}</div>
                <div className="text-white/80">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-2">
            <input className="bg-transparent text-white flex-1 outline-none placeholder-white/50" placeholder="Aggiungi un commento..." />
            <button className="text-[#06B6D4] font-semibold">Invia</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileModal = ({ open, onClose, item }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#0b0f17]/95 border border-white/10 p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-4">
          <img src={item?.avatar} alt={item?.user} className="h-16 w-16 rounded-full border border-white/20" />
          <div>
            <div className="text-white text-xl font-semibold">@{item?.user}</div>
            <div className="text-white/70">Bio futuristica. Dreamer nel cyberspazio.</div>
          </div>
          <button onClick={onClose} className="ml-auto rounded-full p-2 hover:bg-white/10"><X className="h-5 w-5 text-white/80" /></button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-white/80">
          <div><div className="text-white text-lg font-semibold">{formatNumber(item?.views || 0)}</div><div className="text-xs">Views</div></div>
          <div><div className="text-white text-lg font-semibold">{formatNumber(item?.likes || 0)}</div><div className="text-xs">Likes</div></div>
          <div><div className="text-white text-lg font-semibold">{formatNumber((item?.likes || 0) / 100)}</div><div className="text-xs">Followers</div></div>
        </div>
        <div className="mt-6 flex gap-2">
          <button className="flex-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white py-2 font-semibold">Follow</button>
          <button className="flex-1 rounded-full border border-white/20 text-white py-2">Messaggio</button>
        </div>
      </div>
    </div>
  );
};

const CurrentVideoOverlay = ({ activeItem, onSelectHashtag }) => {
  const [tab, setTab] = useState('perte');
  const [showComments, setShowComments] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [query, setQuery] = useState('');

  const hashtags = useMemo(() => (activeItem?.hashtags || []), [activeItem]);

  useEffect(() => {
    setShowComments(false);
    setShowProfile(false);
  }, [activeItem]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Top HUD with logo and tabs */}
      <div className="pointer-events-auto flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] drop-shadow">NEXUS</div>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/5 p-1 border border-white/10">
            <button onClick={() => setTab('perte')} className={`px-3 py-1.5 rounded-full text-sm ${tab==='perte'?'bg-white/15 text-white':'text-white/70 hover:text-white'}`}>Per Te</button>
            <button onClick={() => setTab('seguiti')} className={`px-3 py-1.5 rounded-full text-sm ${tab==='seguiti'?'bg-white/15 text-white':'text-white/70 hover:text-white'}`}>Seguiti</button>
            <button onClick={() => setTab('trending')} className={`px-3 py-1.5 rounded-full text-sm ${tab==='trending'?'bg-white/15 text-white':'text-white/70 hover:text-white'}`}>Trending</button>
          </div>
        </div>
        <div className="relative w-40 sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cerca su NEXUS" className="w-full rounded-full bg-white/10 border border-white/10 pl-9 pr-3 py-1.5 text-sm text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-[#06B6D4]/50" />
        </div>
      </div>

      {/* Hashtag quick chips */}
      <div className="pointer-events-auto mt-2 flex gap-2 px-4 sm:px-6">
        {hashtags.map((h) => (
          <button key={h} onClick={() => onSelectHashtag?.(h)} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/90 hover:bg-white/10">
            {h}
          </button>
        ))}
      </div>

      {/* Bottom overlay controls */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-5 flex flex-col items-center gap-3">
        <div className="rounded-full bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1.5 text-white/80 text-xs">
          Views: <span className="text-white font-semibold">{activeItem ? formatNumber(activeItem.views) : '—'}</span> • Engagement <span className="text-white font-semibold">{activeItem ? Math.max(1, Math.round((activeItem.likes / Math.max(activeItem.views, 1)) * 100)) : 0}%</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowComments(true)} className="rounded-full bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 text-white text-sm">Apri commenti</button>
          <button onClick={() => setShowProfile(true)} className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] px-5 py-2 text-white font-semibold shadow-[0_0_30px_rgba(6,182,212,0.3)]">Profilo</button>
        </div>
      </div>

      <CommentsDrawer open={showComments} onClose={()=>setShowComments(false)} item={activeItem} />
      <ProfileModal open={showProfile} onClose={()=>setShowProfile(false)} item={activeItem} />
    </div>
  );
};

export default CurrentVideoOverlay;
