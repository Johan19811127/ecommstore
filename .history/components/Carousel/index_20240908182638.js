// components/Carousel.js
// components/Carousel.js
import { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-auto max-h-[600px] max-w-[1200px] mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-900 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-2.5 h-2.5 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
