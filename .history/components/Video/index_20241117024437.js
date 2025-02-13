import React from "react";

const VideoSection = () => {
  return (
    <div className="relative w-full h-auto max-h-[600px] max-w-[1200px] mx-auto overflow-hidden">
    <section className="hero">
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          poster="/1.png" // Optional: Poster for fallback when video hasn't loaded
        >
          <source src='/hero.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
     
    </section>
    </div>
  );
};

export default VideoSection;