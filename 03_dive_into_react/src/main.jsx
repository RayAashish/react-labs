import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// function MyApp(){
//   return(
//     <>
//       <p>This is a functio inside the main function.</p>
//     </>
//   )
// }

const user = "\nAashish";

//Internal working of react
//This is the schema used by createElement method of React.
const CustomFunction = React.createElement(
  'a',
  {
    href : "https://ai.com",
    target : "_blank"
  },
  "Click to Go AI.com",
  user
);

createRoot(document.getElementById('root')).render(
  CustomFunction
)
