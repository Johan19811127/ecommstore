import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../../store/ExpandSlice";
import {
  MdArrowForwardIos,
  MdOutlineCategory,
} from "react-icons/md";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import ReorderOutlinedIcon from "@mui/icons-material/ReorderOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useRouter } from "next/router";
import { RiCoupon3Fill } from "react-icons/ri";

export default function Sidebar() {
  const router = useRouter();
  const route = router.pathname.split("/admin/dashboard/")[1];
  const dispatch = useDispatch();
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;

  const handleExpand = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-all duration-300 ease-in-out ${
        expand ? "w-64" : "w-20"
      }`}
    >
      <div
        className="p-4 cursor-pointer hover:bg-gray-700"
        onClick={() => handleExpand()}
      >
        <div
          style={{
            transform: `${expand ? "rotate(180deg)" : ""}`,
            transition: "transform 0.2s",
          }}
          className="text-2xl"
        >
          <MdArrowForwardIos />
        </div>
      </div>

      <div className="px-4 mt-4 space-y-6">
        {/* Operations */}
        <div>
          <div className={`text-xs font-semibold uppercase ${expand ? "block" : "hidden"}`}>
            Operations
          </div>
          <ul className="mt-2 space-y-2">
            <li className={`${route == undefined ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <EqualizerOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Dashboard</span>
            </li>
            <li className={`${route == "sales" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <PointOfSaleOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Sales</span>
            </li>
            <li className={`${route == "orders" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <ReorderOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Orders</span>
            </li>
            <li className={`${route == "users" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <AssignmentIndOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Users</span>
            </li>
            <li className={`${route == "messages" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <ForumOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Messages</span>
            </li>
          </ul>
        </div>

        {/* Inventory */}
        <div>
          <div className={`text-xs font-semibold uppercase ${expand ? "block" : "hidden"}`}>
            Inventory
          </div>
          <ul className="mt-2 space-y-2">
            <li className={`${route == "products" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <CheckroomOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Products</span>
            </li>
            <li className={`${route == "categories" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <CategoryIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Categories</span>
            </li>
            <li className={`${route == "items" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <BusinessCenterOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Items</span>
            </li>
            <li className={`${route == "suppliers" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <FactoryOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Suppliers</span>
            </li>
            <li className={`${route == "stockorders" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <LocalShippingOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Stock Orders</span>
            </li>
            <li className={`${route == "stocklevels" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <TuneOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Stock Levels</span>
            </li>
          </ul>
        </div>

        {/* Store Maintenance */}
        <div>
          <div className={`text-xs font-semibold uppercase ${expand ? "block" : "hidden"}`}>
            Store Maintenance
          </div>
          <ul className="mt-2 space-y-2">
            <li className={`${route == "storeappearance" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <StorefrontOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Store Appearance</span>
            </li>
            <li className={`${route == "storesettings" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <SettingsOutlinedIcon />
              <span className={`${expand ? "block" : "hidden"}`}>Store Settings</span>
            </li>
          </ul>
        </div>

        {/* Coupons */}
        <div>
          <div className={`text-xs font-semibold uppercase ${expand ? "block" : "hidden"}`}>
            Coupons
          </div>
          <ul className="mt-2 space-y-2">
            <li className={`${route == "coupons" ? "bg-gray-700" : ""} flex items-center space-x-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer`}>
              <RiCoupon3Fill />
              <span className={`${expand ? "block" : "hidden"}`}>Coupons</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}