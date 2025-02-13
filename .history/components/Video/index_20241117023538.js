import React from "react";

const VideoSection = () => {
  return (
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
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
     
    </section>
  );
};

export default VideoSection;