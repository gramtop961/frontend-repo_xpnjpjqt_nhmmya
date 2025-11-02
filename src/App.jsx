import React, { useEffect, useState } from 'react';
import Scene3D from './components/Scene3D';
import VideoFeed3D from './components/VideoFeed3D';
import CurrentVideoOverlay from './components/CurrentVideoOverlay';
import Navigation from './components/Navigation';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [filterTag, setFilterTag] = useState('');
  const [route, setRoute] = useState('home');

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full text-white antialiased overflow-hidden">
      <Scene3D />

      {/* Splash Screen */}
      {showSplash && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#070b12]/90 backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto mb-6 h-20 w-20 animate-pulse rounded-3xl bg-gradient-to-br from-[#8B5CF6] via-[#06B6D4] to-[#EC4899] shadow-[0_0_80px_rgba(139,92,246,0.45)]" />
            <div className="text-5xl font-black tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#EC4899]">NEXUS</div>
            <div className="mt-2 text-white/70">Immersive 3D Social Feed</div>
          </div>
        </div>
      )}

      {/* Main Content Layer */}
      <div className="relative z-10 h-[100svh]">
        {/* Feed */}
        <VideoFeed3D
          filterTag={filterTag}
          onActiveChange={(item) => setActiveItem(item)}
        />

        {/* Overlays */}
        <CurrentVideoOverlay
          activeItem={activeItem}
          onSelectHashtag={(h) => setFilterTag(h)}
        />

        {/* Navigation */}
        <Navigation current={route} onNavigate={setRoute} />
      </div>
    </div>
  );
}

export default App;
