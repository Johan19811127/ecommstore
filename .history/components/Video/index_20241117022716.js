import React from "react";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          poster="/path-to-placeholder-image.jpg" // Optional: Poster for fallback when video hasn't loaded
        >
          <source src="/path-to-video.mp4" type="video/mp4" />
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