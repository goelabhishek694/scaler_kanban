import React, {useState} from 'react'

function Counter() {
    const [count, setCount] = useState(0);
    const handleIncrement = () => setCount(count + 1);
    const handleDecrement = () => setCount(count - 1);
  return (
    <div>
        <h1>Counter</h1>
        <button onClick={handleIncrement}>+</button>
        <p>Count is {count}</p>
        <button onClick={handleDecrement}>-</button>
    </div>
  )
}

export default Counter