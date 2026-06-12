import './App.css'
import Button from './component/Button'

function App() {
  const colors = ["red", "blue", "lavandar", "brown"]
  return (
      <body>
        <div className='grid col-end-4 gap-4'>
          {
            colors.map((color, i) => (
              <Button  color={colors[i]} />
            ))
          }
        </div>
      </body>
  )
}

export default App
