import React from 'react'
import { FaBaseballBatBall } from "react-icons/fa6";
import { GiSchoolBag } from "react-icons/gi";
import { FaSocks } from "react-icons/fa6";
import { BiFemale } from "react-icons/bi";
import { GiTie } from "react-icons/gi";
import { GiMonclerJacket } from "react-icons/gi";

export default function Products() {
  const [products, setProducts]

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
          console.log(categories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto lg:w-[1200px] p-4">
  <h1 className="text-3xl font-bold tet-center uppercase mb-3 mt-7 text-blue-900 text-center">OUR PRODUCTS</h1>
  <p className="text-md  leading-tight text-blue-900 text-justify mb-5 md:text-center">Browse our complete collection of all products or filter our products by choosing a category below</p>
<div className="container flex flex-row w-auto mx-auto">
<div className="basis-1/6 px-3 py-5 ml-auto justify-content-center align-items-center">
<FaBaseballBatBall className="w-16 h-16 text-blue-900 mx-auto"></FaBaseballBatBall>
<p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">SPORTSWEAR</p>

</div>

<div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
<GiSchoolBag className="w-16 h-16 text-blue-900 mx-auto"></GiSchoolBag>
<p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">BAGS AND COOLERS</p>
</div>

<div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
<FaSocks className="w-16 h-16 text-blue-900 mx-auto"></FaSocks>
<p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">SOCKS</p>
</div>

<div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
<BiFemale className="w-16 h-16 text-blue-900 mx-auto"></BiFemale>
<p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">GIRLS UNIFORM</p>
</div>

<div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
<GiMonclerJacket className="w-16 h-16 text-blue-900 mx-auto"></GiMonclerJacket>
<p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">JACKETS</p>
</div>


<div className="basis-1/6 px-3 py-5 justify-content-center align-items-center">
<GiTie className="w-16 h-16 text-blue-900 mx-auto"></GiTie>
<p className="text-md mt-3 font-bold text-blue-900 uppercase text-center">Accessories</p>
</div>


</div>
























    </div>
  )
}
