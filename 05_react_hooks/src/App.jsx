import { useState } from "react";

function App() {
  let [ctr, setCtr] = useState(5);

  function increase() {
    ctr++;
    setCtr(ctr)
  }
  function decrese() {
    ctr--
    setCtr(ctr)
  }

  return (
    <>
      <div>
        <h1>{ctr}</h1>
        <button onClick={() => console.log("Clicked")}>Check</button>
        <button onClick={increase} >Increase</button>
        <button onClick={decrese} >Decrese</button>
      </div>
    </>
  )
}

export default App
