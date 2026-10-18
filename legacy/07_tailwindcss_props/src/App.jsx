import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Card from "./components/Card";
function App() {
  const imageLinks = [
    "https://images.pexels.com/photos/11476826/pexels-photo-11476826.jpeg",
    "https://images.pexels.com/photos/37846258/pexels-photo-37846258.jpeg",
    "https://images.pexels.com/photos/20212351/pexels-photo-20212351.jpeg",
    "https://images.pexels.com/photos/34629880/pexels-photo-34629880.jpeg"

  ];
  const headings = [
    "Baagad Billa", "Scene", "Class Camera Frame", "Sparrow"
  ];
  const paras = [
    "Billa bolta : 'Tung Tung Sahuuur'",
    "Scene hai bhai sene. Zindgi ho to yesa barna jhaant na ho",
    "Just another wallpaper with the classic white frame",
    "Kya sparrow ? Sarey chiyda to tumne maar diye."
  ]
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {
          imageLinks.map((imageLink, i) => (
            <Card imageLink={imageLink} heading={headings[i]} para={paras[i]} />
          ))
        };
      </div>
    </>
  );
}

export default App;
