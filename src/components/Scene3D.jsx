import React from 'react';
import Spline from '@splinetool/react-spline';

const Scene3D = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Spline
        scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Neon ambiance overlays - non-blocking */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0f17]/60 via-black/30 to-[#0b0f17]/90" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl bg-[#8B5CF6]/30" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl bg-[#06B6D4]/30" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] bg-[#EC4899]/20" />
    </div>
  );
};

export default Scene3D;
