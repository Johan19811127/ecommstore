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
          <source src="/HeroVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="hero-content">
        <h1>Welcome to Our Website</h1>
        <p>Experience the best with us.</p>
        <button>Get Started</button>
      </div>
    </section>
  );
};

export default VideSection;