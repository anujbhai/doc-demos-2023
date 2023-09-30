import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from "../counterSlice";
import styles from "./CounterComponent.module.css";

const CounterComponent = () => {
  const count = useSelector((state) => state.counter.value);
  // const amount = useSelector((state) => state.counter.amount);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [incrementAmount, _] = useState("2");

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

      <div>
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add amount
        </button>

        <button
          className={styles.button}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Increment async
        </button>
      </div>
    </div>
  );
};

export default CounterComponent;
