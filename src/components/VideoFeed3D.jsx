import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Mock data: 12 sample videos with meta
const sampleBase = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/';
const videosMock = [
  { url: sampleBase + 'BigBuckBunny.mp4', user: 'astro_nova', avatar: 'https://i.pravatar.cc/100?img=15', caption: 'Navigando nel vuoto cosmico ✨', hashtags: ['#nexus', '#3D', '#space'], likes: 12800, comments: 421, views: 210340, date: '2025-09-12' },
  { url: sampleBase + 'ElephantsDream.mp4', user: 'cyber_iris', avatar: 'https://i.pravatar.cc/100?img=49', caption: 'Dreamscape sintetico 🌌', hashtags: ['#viral', '#cyber', '#NEXUS'], likes: 9800, comments: 301, views: 180122, date: '2025-09-10' },
  { url: sampleBase + 'ForBiggerFun.mp4', user: 'quantumflux', avatar: 'https://i.pravatar.cc/100?img=23', caption: 'Tunnel dei fotoni 🚀', hashtags: ['#nexus', '#tunnel', '#wow'], likes: 15600, comments: 532, views: 254013, date: '2025-09-08' },
  { url: sampleBase + 'ForBiggerJoyrides.mp4', user: 'neonwave', avatar: 'https://i.pravatar.cc/100?img=5', caption: 'Joyride tra le stelle 💫', hashtags: ['#joy', '#neon', '#3D'], likes: 22200, comments: 997, views: 554002, date: '2025-09-07' },
  { url: sampleBase + 'ForBiggerMeltdowns.mp4', user: 'glitchgeist', avatar: 'https://i.pravatar.cc/100?img=11', caption: 'Meltdown cromatico 🔮', hashtags: ['#glow', '#magenta', '#trending'], likes: 5400, comments: 129, views: 74033, date: '2025-09-05' },
  { url: sampleBase + 'ForBiggerEscapes.mp4', user: 'synth_runner', avatar: 'https://i.pravatar.cc/100?img=35', caption: 'Escape dal mainframe 🛰️', hashtags: ['#escape', '#synth', '#neon'], likes: 14800, comments: 412, views: 330120, date: '2025-09-02' },
  { url: sampleBase + 'Sintel.mp4', user: 'nova_core', avatar: 'https://i.pravatar.cc/100?img=7', caption: 'Draghi e memorie 🌠', hashtags: ['#sintel', '#fantasy', '#3D'], likes: 7600, comments: 188, views: 144009, date: '2025-09-01' },
  { url: sampleBase + 'TearsOfSteel.mp4', user: 'steel_haze', avatar: 'https://i.pravatar.cc/100?img=52', caption: 'Acciaio e luce ⚙️', hashtags: ['#steel', '#cyber', '#fx'], likes: 19500, comments: 642, views: 490331, date: '2025-08-30' },
  { url: sampleBase + 'SubaruOutbackOnStreetAndDirt.mp4', user: 'orbit', avatar: 'https://i.pravatar.cc/100?img=21', caption: 'Dirt drive in 3D 🌍', hashtags: ['#drive', '#motion', '#parallax'], likes: 5300, comments: 110, views: 70330, date: '2025-08-29' },
  { url: sampleBase + 'VolkswagenGTIReview.mp4', user: 'vector', avatar: 'https://i.pravatar.cc/100?img=29', caption: 'GTI review hypershift 🏁', hashtags: ['#gti', '#speed', '#viral'], likes: 17300, comments: 488, views: 402000, date: '2025-08-27' },
  { url: sampleBase + 'WhatCarCanYouGetForAGrand.mp4', user: 'hyperloop', avatar: 'https://i.pravatar.cc/100?img=58', caption: '1k challenge 🧪', hashtags: ['#challenge', '#tech', '#nexus'], likes: 6400, comments: 145, views: 99011, date: '2025-08-26' },
  { url: sampleBase + 'WeAreGoingOnBullrun.mp4', user: 'zenith', avatar: 'https://i.pravatar.cc/100?img=17', caption: 'Bullrun orbitale 📈', hashtags: ['#trend', '#bull', '#crypto'], likes: 21400, comments: 801, views: 610902, date: '2025-08-24' },
];

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const VideoCard = ({ item, idx, currentIndex, onLike, onPlayToggle, onVolumeToggle, registerRef }) => {
  const isActive = idx === currentIndex;
  const distance = idx - currentIndex; // -1,0,1

  // 3D transform: stack cards in Z space
  const translateZ = distance * -300; // deeper away for next/prev
  const translateY = distance * 120; // vertical offset
  const rotateX = distance * -10; // tilt
  const scale = isActive ? 1 : 0.9;

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (registerRef) registerRef(idx, videoRef);
  }, [idx, registerRef]);

  return (
    <div
      className="absolute left-1/2 top-1/2 w-[90vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `translate3d(-50%, -50%, 0) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
        transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.25)]">
        <video
          ref={videoRef}
          src={item.url}
          muted={muted}
          loop
          playsInline
          preload={isActive ? 'auto' : 'metadata'}
          className="h-full w-full object-cover"
        />
        {/* HUD top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 p-4 flex items-center justify-between text-white/90 text-sm">
          <div className="flex items-center gap-3">
            <img src={item.avatar} alt={item.user} className="h-9 w-9 rounded-full border border-white/20" />
            <div className="leading-tight">
              <div className="font-semibold">@{item.user}</div>
              <div className="text-white/70 text-xs">{new Date(item.date).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={() => { const m = !muted; setMuted(m); onVolumeToggle?.(idx, m); }}
              className="rounded-full bg-black/40 hover:bg-black/60 border border-white/10 px-3 py-1 text-xs"
            >
              {muted ? 'Volume Off' : 'Volume On'}
            </button>
            <button
              onClick={() => { const p = !playing; setPlaying(p); onPlayToggle?.(idx, p); if (!videoRef.current) return; p ? videoRef.current.play() : videoRef.current.pause(); }}
              className="rounded-full bg-black/40 hover:bg-black/60 border border-white/10 px-3 py-1 text-xs"
            >
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
        {/* Caption bottom */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="font-semibold drop-shadow">{item.caption}</div>
          <div className="mt-1 text-sm text-white/80 space-x-2">
            {item.hashtags.map((h) => (
              <span key={h} className="hover:text-[#06B6D4] cursor-pointer">{h}</span>
            ))}
          </div>
        </div>
        {/* Right action rail */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <button onClick={() => onLike(idx)} className="group relative rounded-full p-3 bg-black/40 hover:bg-black/60 border border-white/10 text-white">
            <span className="absolute -inset-2 rounded-full bg-[#EC4899]/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-[#EC4899] drop-shadow"> <path d="M12 21s-7.5-4.35-9.75-8.4C.5 9.55 2.3 6 6 6c2 0 3.2 1.2 4 2 0.8-0.8 2-2 4-2 3.7 0 5.5 3.55 3.75 6.6C19.5 16.65 12 21 12 21z"/> </svg>
            <div className="text-xs text-white/80 mt-1">{Intl.NumberFormat('en', { notation: 'compact' }).format(item.likes)}</div>
          </button>
          <div className="rounded-full p-3 bg-black/40 border border-white/10 text-white text-center">
            💬
            <div className="text-xs text-white/80 mt-1">{Intl.NumberFormat('en', { notation: 'compact' }).format(item.comments)}</div>
          </div>
          <div className="rounded-full p-3 bg-black/40 border border-white/10 text-white text-center">
            ⤴️
            <div className="text-xs text-white/80 mt-1">Share</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoFeed3D = ({ filterTag, onActiveChange }) => {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState(videosMock);
  const refs = useRef({});
  const touchStartY = useRef(null);
  const isScrolling = useRef(false);

  const filtered = useMemo(() => {
    if (!filterTag) return items;
    return items.filter((v) => v.hashtags.map((h) => h.toLowerCase()).includes(filterTag.toLowerCase()));
  }, [items, filterTag]);

  const safeIndex = clamp(index, 0, Math.max(0, filtered.length - 1));

  useEffect(() => { onActiveChange?.(filtered[safeIndex], safeIndex); }, [safeIndex, filtered, onActiveChange]);

  const goTo = useCallback((next) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setIndex((i) => clamp(i + next, 0, Math.max(0, filtered.length - 1)));
    setTimeout(() => { isScrolling.current = false; }, 650);
  }, [filtered.length]);

  const onWheel = useCallback((e) => {
    if (Math.abs(e.deltaY) < 24) return;
    goTo(e.deltaY > 0 ? 1 : -1);
  }, [goTo]);

  const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (touchStartY.current == null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > 40) goTo(dy < 0 ? 1 : -1);
    touchStartY.current = null;
  };

  const registerRef = (i, ref) => { refs.current[i] = ref; };

  const like = (i) => {
    setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, likes: it.likes + 1 } : it));
    // simple floating heart effect
    const card = document.querySelector('[data-card="' + i + '"]');
    if (!card) return;
  };

  // Preload next video lightly
  useEffect(() => {
    const next = filtered[safeIndex + 1];
    if (next) {
      const v = document.createElement('video');
      v.src = next.url;
      v.preload = 'metadata';
    }
  }, [safeIndex, filtered]);

  return (
    <div
      className="relative h-full w-full"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}
    >
      {filtered.map((item, i) => {
        if (Math.abs(i - safeIndex) > 1) return null; // render window +/-1
        return (
          <div key={i} data-card={i}>
            <VideoCard
              item={item}
              idx={i}
              currentIndex={safeIndex}
              onLike={like}
              onPlayToggle={() => {}}
              onVolumeToggle={() => {}}
              registerRef={registerRef}
            />
          </div>
        );
      })}
    </div>
  );
};

export default VideoFeed3D;
