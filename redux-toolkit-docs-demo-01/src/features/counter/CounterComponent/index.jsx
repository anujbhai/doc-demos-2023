import { useDispatch, useSelector } from "react-redux";

import { decrement, increment } from "../counterSlice";
import styles from "./CounterComponent.module.css";

const CounterComponent = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className={styles.row}>
      <button
        className={styles.button}
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>

      <span className={styles.value}>{count}</span>

      <button
        className={styles.button}
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
};

export default CounterComponent;
