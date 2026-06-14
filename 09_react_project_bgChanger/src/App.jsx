import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("lavander")
  return (
        <div className='h-screen w-screen px-2 py-2' style={{backgroundColor : color}}>
          <div className='bg-blue-300 p-2 flex justify-around rounded-2xl'>
            <button onClick={() => setColor("red")} style={{backgroundColor : "red"}} className='h-10 w-20 bg-red-600 rounded-xl hover:bg-red-900 hover:cursor-pointer'>Red</button>
            <button onClick={() => setColor("green")} className='h-10 w-20 bg-green-600 rounded-xl hover:bg-green-900 hover:cursor-pointer'>Green</button>
            <button onClick={() => setColor("blue")} className='h-10 w-20 bg-blue-600 rounded-xl hover:bg-blue-900 hover:cursor-pointer'>Blue</button>
            <button onClick={() => setColor("yellow")} className='h-10 w-20 bg-yellow-600 rounded-xl hover:bg-yellow-900 hover:cursor-pointer'>Yellow</button>
            <button onClick={() => setColor("orange")} className='h-10 w-20 bg-orange-600 rounded-xl hover:bg-orange-900 hover:cursor-pointer'>Orange</button>
          </div>
        </div>
  )
}

export default App
