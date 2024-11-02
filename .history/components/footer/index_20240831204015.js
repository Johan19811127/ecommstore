import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BsFillTelephoneFill } from "react-icons/bs";
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

 

export default function Footer() {
const router = useRouter()
    const [currentUrl, setCurrentUrl] = useState('');


    useEffect(() => {
        // This will construct the full URL, including protocol, hostname, and pathname
        const url = `${window.location.protocol}//${window.location.host}${router.asPath}`;
        setCurrentUrl(url);
      }, [router.asPath]);

  return (

    <div className="w-screen p-5 bg-gray-50 border border-t-slate-300 mt-10">
        <div className="flex flex-row">

<div className="container mx-auto lg:w-[1200px] p-4">
<div className="flex flex-col md:flex-row">
    <div className="lg:basis-2/12 p-4">
   <Image src="/badge.png" width="200" height="200" alt="Monte Vista Primary School" className=" w-[20vw] md:w-[70%] h-auto mx-auto"></Image>
   
    </div>
    <div className="lg:basis-5/12 content-center items-center px-5">
    <h6 className="font-semibold text-lg mb-4 text-blue-800">Monte Vista Primary School - Online Store</h6>
    <p className="text-md mb-2 text-blue-800 text-justify leading-tight">Supporting our learners with quality school wear and merchandise. Every purchase directly benefits the school and helps us continue to provide excellent education and a nurturing environment for our children. All orders include free delivery to Monte Vista learners and come with an easy return policy for your convenience.</p>
    </div>
    <div className="lg:basis-5/12 content-center items-center px-5">
    <p className="text-md font-semibold text-lg mb-2 text-blue-800 md:text-end "> Contact us on:.</p>
  
    <p className="text-md align-middle text-blue-800 md:text-end"><span className="inline-flex mr-3 font-bold items-center ">A:</span>7 Huising Avenue, Monte Vista 7460</p>
    <p className="text-md align-middle text-blue-800 md:text-end"><span className="inline-flex mr-3 font-bold items-center ">E:</span>clothingstore@montevistaps.co.za</p>
    <p className="text-md align-middle text-blue-800 md:text-end "><span className="inline-flex mr-3 font-bold items-center mb-2 ">T:</span>021 558 4637</p>
    
    
  

    
    
 
  
    
    
  
    <p className="text-md font-semibold text-lg mb-2 text-blue-800 md:text-end">Clothing Store Trading hours:
    </p>
    <p className="text-md align-middle text-blue-800 md:text-end"><span className="inline-flex mr-3 font-bold items-center mb-2 ">TUE:</span>7:30 - 8:15    /  <span className="inline-flex mx-3 font-bold items-center mb-2 ">WED</span> 13:00 - 14:45</p>
   </div>
   
   
 
</div>
<div className="items-center content-center">
<div className="border border-t-gray-300 my-3 "></div>
    <p className="text-sm text-blue-800 text-center mb-2">Please share this page by clicking any of the icons below:</p>
    <div className="flex flex-row ">
        
    <div className="flex flex-row content-center items-center my-2 mx-auto gap-3">
                <EmailShareButton url={currentUrl} subject="Monte Vista Primary School - Online store" body="body">
                  <EmailIcon size={32} round />
                </EmailShareButton>

                <WhatsappShareButton url={currentUrl} title="Monte Vista Primary School - Online store" separator=":: ">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <FacebookShareButton url={currentUrl}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton url={currentUrl} title="Monte Vista Primary School - Online store">
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <RedditShareButton url={currentUrl} title="Monte Vista Primary School - Online store" windowWidth={660} windowHeight={460}>
                  <RedditIcon size={32} round />
                </RedditShareButton>

                <PinterestShareButton url={currentUrl} media={"/badge.png"}>
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
              </div>
            </div>
    </div>

    
    </div>
   <div className="w-[20vw]"
    <Image src="/schooljersey.png" width="300" height="300" alt="Monte Vista primary School - Online Store" className="relative float-right bottom-0 right-0"></Image>

    </div>
    </div>




   
 
  )
}
 