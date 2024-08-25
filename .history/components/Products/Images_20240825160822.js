import React, { useState } from 'react';
import Image from 'next/image';

export default function ImageCarousel({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <Image
          src={images[selectedImageIndex]}
          alt={`Image ${selectedImageIndex + 1}`}
          width={600}
          height={600}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-center space-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`cursor-pointer border-2 rounded-lg p-1 ${
              selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={100}
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}