import React, { useState } from 'react';

const Checker = () => {
  // Initialize an array to track width for each <li>, all set to 0px initially
  const [widths, setWidths] = useState([0, 0, 0, 0, 0]);

  const handleClick = (index) => {
    // Update the clicked <li> to 200px, without changing others back to 0px
    setWidths((prevWidths) =>
      prevWidths.map((width, i) => (i === index ? 200 : width))
    );
  };

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
    {[...Array(5)].map((_, index) => (
      <li
        key={index}
        onClick={() => handleClick(index)} // Handle click on each <li>
        style={{
          width: widths[index] + 'px', // Set the width from the `widths` state
          height: '50px',
          backgroundColor: 'lightblue',
          marginBottom: '10px',
          transition: 'width 0.5s ease', // Smooth transition for width change
          cursor: 'pointer',
        }}
      >
        List Item {index + 1}
      </li>
    ))}
  </ul>
  )
}

export default Checker
