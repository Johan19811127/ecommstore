import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import NavLinks from '@/components/NavLinks';
import { GiResize } from "react-icons/gi";
import { useCart } from '@/context/CartContext'

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
  const { addToCart } = useCart();
  const router = useRouter();
  const { id } = router.query;
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [selItem, setSelItem] = useState(null);
  const [items, setItems] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [error, setError] =useState();

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/product/${id}`);
          const data = await res.json();
          if (data.success) {
            setProduct(data.data);
          } else {
            console.error('Product not found');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch('/api/transaction/costqty');
        const idet = await response.json();
        if (idet.success) {
          setItemDetails(idet.data);
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        const data = await response.json();
        if (data.success) {
          setItems(data.data);
          await fetchItemDetails(); // Fetch item details after fetching items
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (items.length > 0 && itemDetails.length > 0) {
      const detailedItems = items.map(item => {
        const transaction = itemDetails.find(t => t._id === item._id);
        return {
          ...item,
          totalOnHand: transaction ? transaction.totalOnHand : 0,
          costPrice: transaction ? transaction.costPrice : 0,
        };
      });
      const filteredItems = detailedItems.filter(item => item.product === id);
      setProductItems(filteredItems);
      setSelItem(filteredItems.length > 0 ? filteredItems[0] : null);
    }
  }, [items, itemDetails, id]);

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.host}${router.asPath}`;
    setCurrentUrl(url);
  }, [router.asPath]);


  const handleAddToCart = () => {
    setError('');
    if (qty < 1) return; // Ensure the quantity is at least 1
    if(qty > selItem.totalOnHand){
      setError("The Quantity rsequested is more than the amount of ")
    }
    addToCart(product, qty);
    alert(`${qty} ${product.name} added to cart`);
  };


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
            <h1 className="text-3xl font-bold text-blue-800 uppercase">{product.name}</h1>

            <p className="mt-5 mb-5 uppercase text-blue-800 font-bold">Item Description:</p>
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

            {productItems.length === 1 && (
              <>
                <p className="mt-4 mb-1 uppercase text-blue-900 font-bold">Pricing and Stock on Hand:</p>
                <p className="align-middle font-medium text-gray-700">
                  Size: <span className="ml-11 text-blue-900 antialiased uppercase">{productItems[0].size}</span>
                </p>
                <p className="align-middle font-medium text-gray-700">
                  Price: <span className="ml-9 text-blue-900 antialiased uppercase">R {Number(productItems[0].selling).toFixed(2)}</span>
                </p>
                <p className="align-middle font-medium text-gray-700">
                  In Stock: <span className="ml-4 text-blue-900 antialiased uppercase">{productItems[0].totalOnHand}</span>
                </p>
              </>
            )}

            {productItems.length > 1 && (
              <>
               <p className="mb-1 text-blue-800 text-sm">Refer to the <a href="/products/sizes" className="font-semibold text-lg">sizing charts </a>to ensure the perfect fit for your selection.</p>
                <p className="mb-3 text-gray-900 text-sm">Please choose the item you are interested in:</p>
               
                <div className="flex flex-row gap-3">
                  {productItems.map((size) => (
                    <button
                      key={size.size}
                      type="button"
                      onClick={() => setSelItem(size)}
                      className={`text-md font-semibold py-2 px-4 rounded-lg flex-grow-0 flex-shirk-0 ${
                        selItem && selItem.size === size.size ? 'bg-blue-600 text-white' : 'bg-gray-300'
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>

                {selItem && (
                  <>
                    <p className="mt-5 mb-3 uppercase text-blue-900 font-bold">Pricing and Stock on Hand for selected variant:</p>
                    <div className="flex flex-row">
                 
                      <p className="align-middle text-gray-700 ">Size: </p>
                      <p className="ml-5 text-blue-900 antialiased uppercase">{selItem.size}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="align-middle text-gray-700">Price: </p>
                      <p className="ml-4 text-blue-900 antialiased uppercase">R {Number(selItem.selling).toFixed(2)}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="align-middle text-gray-700">In Stock: </p>
                      <p className="ml-2 text-blue-900 antialiased uppercase">{selItem.totalOnHand}</p>
                    </div>
                  </>
                )}
              </>
            )}

            <form>
              <div className="my-3 flex flex-row gap-5 items-center">
                <div className="basis-1/4 ">
                  <p className="align-middle font-medium text-gray-700">Quantity required</p>
                </div>
                <div className="basis-1/4">
                  <input
                    type="number"
                    name="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder=""
                    className="w-full px-3 py-2 border text-md border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-1"
                  />
                </div>
                <div className="basis-1/3 ">
                  <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-600 text-white uppercase font-semibold rounded-lg hover:bg-blue-500">
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
