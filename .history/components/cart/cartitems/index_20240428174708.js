import styles from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css"
import { BsHeart } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../store/cartSlice";
import { useState, useEffect } from "react";

export default function Product({ product, selected, setSelected }) {
  const { cart } = useSelector((state) => ({ ...state }));
  const [active, setActive] = useState();
  console.log(active);
  useEffect(() => {
    const check = selected.find((p) => p.id == product.id);
    setActive(check);
  }, [selected]);
  const dispatch = useDispatch();
  const updateQty = (type) => {
    let newCart = cart.cartItems.map((p) => {
      if (p.id == product.id) {
        return {
          ...p,
          qty: type == "plus" ? product.qty + 1 : product.qty - 1,
        };
      }
      return p;
    });
    dispatch(updateCart(newCart));
  };
  const removeProduct = (id) => {
    let newCart = cart.cartItems.filter((p) => {
      return p.id != id;
    });
    dispatch(updateCart(newCart));
  };
  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((p) => p.id !== product.id));
    } else {
      setSelected([...selected, product]);
    }
  };
  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src="../../../images/store.webp" alt="" />
       Monte Vista Primary School
      </div>
      <div className={styles.product__image}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={() => handleSelect()}
        ></div>
        <img src={product.img} alt={product.name} />
        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}`
                : product.name}
            </h1>
            <div style={{ zIndex: "2" }}>
              <BsHeart />
            </div>
            <div
              style={{ zIndex: "2" }}
              onClick={() => removeProduct(product.id)}
            >
              <AiOutlineDelete />
            </div>
          </div>
          <div className={styles.product__style}>
         
          Size: 
            {product.size && <span>{product.size}</span>}
            </div>
            <div className={styles.product__style}>
             Price: 
            {product.price && <span>R {product.price.toFixed(2)}</span>}
            
        
          </div>
          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
                
                Subtotal: 
              <span className={styles.price}>
               R  {(product.price * product.qty).toFixed(2)}
              </span>
              
           
           
            </div>
            <div className={styles.product__priceQty_qty}>
              <button
                disabled={product.qty < 2}
                onClick={() => updateQty("minus")}
              >
                -
              </button>
              <span>{product.qty}</span>
              <button
                disabled={product.qty == product.quantity}
                onClick={() => updateQty("plus")}
              >
                +
              </button>
            </div>
          </div>
         
          {product.quantity < 1 && (
            <div className={styles.notAvailable}>
              This product is out of stock, Add it to your whishlist it may get
              restocked.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

