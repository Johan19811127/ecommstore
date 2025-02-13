import React from "react";

const VideoSection = () => {
  return (
    <div className="">
      <section className="relative w-fullh-screen flex items-center justify-center  max-h-[600px] max-w-[1200px] mx-auto overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/1.png" // Optional placeholder
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
    </div>
  );
};

export default VideoSection;