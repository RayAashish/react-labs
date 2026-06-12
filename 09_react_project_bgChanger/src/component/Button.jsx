import React from "react";

function Button({color = "Blue"}) {
  const changeColor = () => {
    <body className="bg-amber-500">
      
    </body>
  }
  return (
    <>
      <button onClick={changeColor()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        {color}
      </button>
    </>
  );
}

export default Button;
