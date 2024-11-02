// pages/products/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import NavLinks from '@/components/NavLinks';
import Navbar from '@/components/Navbar';
import ImageCarousel from '@/components/Products/Images';
import {
  FacebookMessengerShareButton,
  TwitterShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  RedditShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
  TwitterIcon,
  PinterestIcon,
  TelegramIcon,
  RedditIcon,
} from 'react-share';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch product details from the API
      fetch(`/api/product/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProduct(data.data); // Access the product data correctly
          } else {
            console.error('Product not found');
          }
        })
        .catch(err => console.error('Error fetching product details:', err));
    }
  }, [id]);

  useEffect(() => {
    // This will construct the full URL, including protocol, hostname, and pathname
    const url = `${window.location.protocol}//${window.location.host}${router.asPath}`;
    setCurrentUrl(url);
  }, [router.asPath]);

  // Log product outside of useEffect to see the updated state
  console.log(product);

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen w-screen bg-gray-100">
      <Navbar />
      <NavLinks />
      <div className="container bg-white mx-auto mt-8 lg:w-[1200px] p-4 rounded-lg">
        <div className="grid md:grid-cols-2 gap-3 items-center">
          <div className="p-4 rounded-lg">
            <ImageCarousel images={product.images} />
          </div>

          <div className="px-5">
            <h1 className="text-4xl font-bold text-blue-800">{product.name}</h1>

            <p className="mt-5 mb-5 uppercase text-blue-900 font-bold">Item Description:</p>
            <p className="text-sm text-gray-700 leading-tight text-justify">{product.description}</p>

            <div className="mt-4 rounded-lg">
              <p className="mt-5 mb-5 uppercase text-blue-900 font-bold">Share this page:</p>

              <div className="flex flex-row content-center items-center my-5 gap-3">
                <EmailShareButton url={currentUrl} subject={product.name} body="body">
                  <EmailIcon size={32} round />
                </EmailShareButton>

                <WhatsappShareButton url={currentUrl} title={product.name} separator=":: ">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <FacebookShareButton url={currentUrl}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton url={currentUrl} title={product.name}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <RedditShareButton url={currentUrl} title={product.name} windowWidth={660} windowHeight={460}>
                  <RedditIcon size={32} round />
                </RedditShareButton>

                <PinterestShareButton url={currentUrl} media={product.images[1]}>
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
              </div>
            </div>

            {product.sizes && product.sizes.length === 1 && (
              <>
                <p className="mt-4 mb-1 uppercase text-blue-900 font-bold">Pricing and Stock on Hand:</p>
                <p className="align-middle font-medium text-gray-700">
                  Size: <span className="ml-11 text-blue-900 antialiased uppercase">{product.sizes[0].size}</span>
                </p>
                <p className="align-middle font-medium text-gray-700">
                  Price: <span className="ml-9 text-blue-900 antialiased uppercase">R {Number(product.sizes[0].selling).toFixed(2)}</span>
                </p>
                <p className="align-middle font-medium text-gray-700">
                  In Stock: <span className="ml-4 text-blue-900 antialiased uppercase">{product.sizes[0].quantity}</span>
                </p>
              </>
            )}

            {product.sizes && product.sizes.length > 1 && (
              <>
               <p className="mt-5 mb-5 uppercase text-blue-900 font-bold">Pricing and Stock on Hand for all variants:</p>
               <p className="text-blue-900 font-bold">Pricing and Stock on Hand for all variants:</p>
              <div className="flex flex-row gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    type="button"
                    className="bg-blue-600  text-md font-semibold text-white py-2 px-4 rounded-lg flex-grow">
                    {size.size}
                  </button>
                ))}
              </div>
              </>
            )}

            <form>
              <div className="my-5 flex flex-row gap-3 items-center">
                <div className="basis-1/3 pr-5">
                  <p className="align-middle font-medium text-gray-700">Items required</p>
                </div>
                <div className="basis-1/3 pl-5">
                  <input
                    type="number"
                    name="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder=""
                    className="w-full px-3 py-2 border text-md border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
                  />
                </div>
                <div className="basis-1/3 pl-5">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                    Add to Cart
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

