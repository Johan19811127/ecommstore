import styles from "./styles.module.scss";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";

export default function Checkout({
  subtotal,
  shippingFee,
  total,
  selected,
  saveCartToDbHandler,
}) {
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h1>Order Summary</h1>
      <p className={styles.desc}>The total below shows the total for the items you have selected to checkout.</p>
      <div className={styles.cart__checkout_line}>
        <span>Subtotal</span>
        <span>R {subtotal}</span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Delivery Charge</span>
        <span>R 0.00</span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Total</span>
        <span>R {total}</span>
      </div>
      <div className={styles.submit}>
        <button
          disabled={selected.length == 0}
          style={{
            background: `${selected.length == 0 ? "#eee" : ""}`,
            cursor: `${selected.length == 0 ? "not-allowed" : ""}`,
          }}
          onClick={() => saveCartToDbHandler()}
        >
          Continue to Checkout<span>
          <MdOutlineShoppingCartCheckout />
          </span>
        </button>
      </div>
      <div className={styles.back}>
       
        <button>
         <a href="/">
        <span>
         <MdOutlineArrowBack />
        </span>
          Back to Store
          </a>
        </button>
      </div>
    </div>
  );
}