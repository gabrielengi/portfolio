// import React, {useState, useRef} from 'react'

// function Square({i, j, cellWidth, cellHeight}) {
//   var color = 'white';
//   const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };
    
//   function onSquareClick() {
//     console.log(i + ',' + j)
//     color = getRandomColor();
//   }

//   return (
//     <div className="square" onClick={() => onSquareClick()} 
//     style={{
//       width:`${cellWidth}px`,
//       height:`${cellHeight}px`,
//       borderWidth:'1px',
//       borderColor:'black',
//       position:'absolute',
//       backgroundColor:color,
//       left: `${j * cellWidth}px`,
//       top: `${i * cellHeight}px`,
//     }}>
      
//     </div>
//   );
// }



// const ColorGrid = () => {
//   const [grid, setGrid] = useState([]);
//   const [cellWidth, setCellWidth] = useState(20);
//   const [cellHeight, setCellHeight] = useState(20);
//   const [dimensions, setDimensions] = useState({ gw: 0, gh: 0, cw: 20, ch: 20 });
//   var sizeCorrected = useRef(false);
//   console.log("rendering");
//   function correctSize() {
//     var gwTemp = Math.trunc(window.innerWidth/dimensions.cw);
//     var ghTemp = Math.trunc(window.innerHeight/dimensions.ch);
//     var cwTemp = Math.round((dimensions.cw + (window.innerWidth % dimensions.cw) / gwTemp) ) ;
//     var chTemp = Math.round((dimensions.ch + (window.innerHeight % dimensions.ch) / ghTemp) ) ; 
//     console.log(dimensions.cw + ',' + dimensions.ch);
//     sizeCorrected.current = true;
//     setDimensions({gw: gwTemp, gh: ghTemp, cw: cwTemp, ch: chTemp});

//   }

//   if (!sizeCorrected.current)
//     correctSize();


  

//  // var m = Math.trunc(window.innerWidth/cellWidth), n= Math.trunc(window.innerHeight/cellHeight);


//   // window.addEventListener('resize', function(event) {
//   //   correctSize();
//   // }, true);
//   // var G = new Array(x);
//   // for (let i = 0; i < 100; i++) {
//   //   G[i] = new Array(y);
//   // }
//   var G = new Array(dimensions.gh).fill(0).map(() => new Array(dimensions.gw).fill(0));
//  // G[30][30] = 10000;

//  console.log(dimensions.cw + ',' + dimensions.ch);
//  console.log(G);


//   return (
//     <div>
//       {G.map((row, i) =>(
//         row.map((cell, j) =>(
//           <Square key={i + j} i={i} j={j} cellWidth={dimensions.cw} cellHeight={dimensions.ch}/>
//         ))
//       ))}
//     </div>
//   );
// };
// export default ColorGrid;

import React, { useState, useEffect, useRef } from 'react';

const ColorGrid = () => {
  const [grid, setGrid] = useState([]);
  const [cellSize, setCellSize] = useState(20);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const titleInitializedRef = useRef(false);
  
  // Generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // Define the GABE HOUSE title pattern
  const createTitleCells = () => {
    // Define the pixel patterns for each letter
    const titlePattern = {
      'G': [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 1],
        [1, 1, 1]
      ],
      'A': [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1]
      ],
      'B': [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 1, 1]
      ],
      'E': [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 0],
        [1, 1, 1]
      ],
      'H': [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1]
      ],
      'O': [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
      'U': [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
      'S': [
        [1, 1, 1],
        [1, 0, 0],
        [0, 1, 1],
        [1, 1, 1]
      ],
      ' ': [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    };
    
    const title = "GABE HOUSE";
    const titleWidth = title.length * 4 - 1;
    const gridWidth = Math.ceil(window.innerWidth / cellSize);
    const gridHeight = Math.ceil(window.innerHeight / cellSize);
    
    const startX = Math.floor((gridWidth - titleWidth) / 2);
    const startY = Math.floor(gridHeight * 0.2);
    
    const titleCells = [];
    
    // Create the title grid
    for (let letterIndex = 0; letterIndex < title.length; letterIndex++) {
      const letter = title[letterIndex];
      const pattern = titlePattern[letter];
      
      if (pattern) {
        for (let y = 0; y < pattern.length; y++) {
          for (let x = 0; x < pattern[y].length; x++) {
            if (pattern[y][x] === 1) {
              titleCells.push({
                x: startX + letterIndex * 4 + x,
                y: startY + y,
                color: '#000000',
                isTitle: true
              });
            }
          }
        }
      }
    }
    
    return titleCells;
  };
  
  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Initialize title when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      if (!titleInitializedRef.current) {
        // First time initialization - add title cells
        const titleCells = createTitleCells();
        setGrid(titleCells);
        titleInitializedRef.current = true;
      }
    }
  }, [dimensions]);
  
  // Handle cell click
  const handleClick = (e) => {
    const x = Math.floor(e.clientX / cellSize);
    const y = Math.floor(e.clientY / cellSize);
    
    // Check if this cell already has a color
    const cellExists = grid.some(cell => cell.x === x && cell.y === y);
    
    if (!cellExists) {
      setGrid([...grid, { x, y, color: getRandomColor() }]);
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen fixed top-0 left-0 bg-white cursor-pointer overflow-hidden"
      onClick={handleClick}
      style={{
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`
      }}
    >
      {grid.map((cell, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            backgroundColor: cell.color,
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: `${cell.x * cellSize}px`,
            top: `${cell.y * cellSize}px`,
          }}
        />
      ))}
    </div>
  );
};

export default ColorGrid;