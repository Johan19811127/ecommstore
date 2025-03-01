// pages/products/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import NavLinks from '@/components/NavLinks';
import Navbar from '@/components/Navbar';
import ImageCarousel from '@/components/Products/Images';
import { FacebookMessengerShareButton, TwitterShareButton,
  FacebookShareButton,XIcon,PinterestIcon,PinterestShareButton,TelegramIcon,TelegramShareButton,RedditIcon,RedditShareButton,EmailShareButton,WhatsappShareButton,FacebookIcon
  ,EmailIcon,WhatsappIcon,} from 'react-share';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
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
    <div className="h-screen w-screen bg-gray-100 ">  
    <Navbar></Navbar>
    <NavLinks></NavLinks>
    <div className="container bg-white mx-auto mt-8 lg:w-[1200px] p-4 rounded-lg p-5">
      <div className="grid md:grid-cols-2 gap-3">
        <div className=" p-4 rounded-lg">
          <ImageCarousel images={product.images}></ImageCarousel>
        </div>

        <div className="px-5">
          <h1 className="text-4xl font-bold text-blue-800">{product.name}</h1>
       
<p className="mt-5 mb-5 uppercase text-blue-900 font-bold ">Item Description:</p>
          <p className="text-sm text-gray-700 leading-tight text-justify">{product.description}</p>
          {product.sizes && product.sizes.length === 1 && (
            
            <><div className="mt-4  rounded-lg">
<p className="mt-5 mb-5 uppercase text-blue-900 font-bold">Share this page:</p>

<div className="flex flex-row content-center items-center my-5 gap-3">







<EmailShareButton
          url={currentUrl}
          subject={product.name}
          body="body"
          className="Demo__some-network__share-button"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
        
        <WhatsappShareButton
          url={currentUrl}
          title={product.name}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
               
               
               
               
               
               
               <FacebookShareButton
          url={currentUrl}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={currentUrl}
          title={product.name}
          className="Demo__some-network__share-button"
        >
          <XIcon size={32} round />
        </TwitterShareButton>

        <RedditShareButton
          url={currentUrl}
          title={product.name}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <RedditIcon size={32} round />
        </RedditShareButton>

        <PinterestShareButton
          url={currentUrl}
          media={product.images[1]}
          className="Demo__some-network__share-button"
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>


          </div>
<p className="mt-4 mb-1 uppercase text-blue-900 font-bold">Pricing and Stock on Hand:</p>
              <p className="align-middle		font-medium text-gray-700"> Size: <span className=" ml-11 text-blue-900  antialiased uppercase">{product.sizes[0].size}</span> </p>
              <p className="align-middle	font-medium	 text-gray-700"> Price: <span className="ml-9 text-blue-900 antialiased uppercase">R {Number(product.sizes[0].selling).toFixed(2)}</span> </p>
              <p className="align-middle	font-medium	text-gray-700"> In Stock: <span className=" ml-4 text-blue-900 antialiased uppercase"> {product.sizes[0].quantity}</span> </p>
            </div>
            
            <div className="my-5 flex flex-row ">
              <div className="basis-1/3 pl-5">Items required</div>
            </div>
            
            
            
            
            </>
          )}

        

          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
   
</div>
  );
}
