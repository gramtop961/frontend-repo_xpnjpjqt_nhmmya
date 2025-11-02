import React from 'react';
import { Home, Search, PlusCircle, User } from 'lucide-react';

const NavButton = ({ icon: Icon, label, active=false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center px-4 py-2 text-xs ${active ? 'text-white' : 'text-white/70 hover:text-white'}`}
  >
    <div className={`rounded-2xl border ${active?'border-white/30 bg-white/10':'border-white/10 bg-white/5'} p-2 mb-1 backdrop-blur-xl`}> <Icon className="h-5 w-5" /> </div>
    {label}
  </button>
);

const Navigation = ({ current='home', onNavigate }) => {
  return (
    <div className="pointer-events-auto fixed inset-x-0 bottom-3 z-30 mx-auto w-full max-w-xl">
      <div className="mx-3 rounded-full border border-white/10 bg-black/40 px-2 py-1.5 backdrop-blur-xl flex items-center justify-around text-white">
        <NavButton icon={Home} label="Home" active={current==='home'} onClick={()=>onNavigate?.('home')} />
        <NavButton icon={Search} label="Discover" active={current==='discover'} onClick={()=>onNavigate?.('discover')} />
        <NavButton icon={PlusCircle} label="Upload" active={current==='upload'} onClick={()=>onNavigate?.('upload')} />
        <NavButton icon={User} label="Profilo" active={current==='profile'} onClick={()=>onNavigate?.('profile')} />
      </div>
    </div>
  );
};

export default Navigation;
