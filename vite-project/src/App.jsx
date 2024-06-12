import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Daily1 from './assets/Daily1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Daily1/>
    </>
  )
}

export default App
