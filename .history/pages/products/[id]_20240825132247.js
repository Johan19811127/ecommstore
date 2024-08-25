// pages/products/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (_id) {
      // Replace this with your API call to fetch product details
      fetch(`/api/product/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.error('Error fetching product details:', err));
    }
  }, [id]);

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto lg:w-[1200px] p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-4 rounded-lg">
          <Image
            src={product.images}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-2 text-xl text-gray-700">{`R ${Number(product.price).toFixed(2)}`}</p>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
