import { useState } from "react";

export default function Count() {
  const [count, setCount] = useState(0);

  function handleClickA() {
    console.log('点击时 count =', count);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log('点击后 count =', count);
  }

  function handleClickB() {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  function handleClickC() {
    setCount(count + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClickA}>A: 直接加三次</button>
      <button onClick={handleClickB}>B: 函数式加三次</button>
      <button onClick={handleClickC}>C: 混合</button>
    </div>
  );
}
