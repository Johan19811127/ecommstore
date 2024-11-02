import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { compareArrays } from "../../../utils/arrays_utils";
export default function CartHeader({ cartItems, selected, setSelected }) {
  const [active, setActive] = useState();
  useEffect(() => {
    const check = compareArrays(cartItems, selected);
    setActive(check);
  }, [selected]);
  const handleSelect = () => {
    if (selected.length !== cartItems.length) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };

  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h1>Items in your Cart</h1>
      <p className={styles.desc}>Please select the items you wish to checkout or select all by clicking below.</p>
      <div className={styles.flex} onClick={() => handleSelect()}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
        ></div>
        <span>Select all items</span>
      </div>
    </div>
  );
}
