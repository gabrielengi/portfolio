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
  const [grid, setGrid] = useState({});
  const [cellSize, setCellSize] = useState(20);
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const initializedRef = useRef(false);
  
  // Generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // Calculate optimal cell size based on window dimensions
  const calculateOptimalCellSize = () => {
    const title = "GABE HOUSE";
    const minTitleWidth = title.length * 4 - 1; // Each letter is 3 wide + 1 space, minus 1 at the end
    
    // Get window dimensions, using more reliable methods for mobile
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    // Calculate required width with a bit more space for mobile
    const requiredWidth = minTitleWidth * 1.25;
    
    // Get the smaller of our default or the calculated size
    let optimalSize = Math.min(20, Math.floor(windowWidth / requiredWidth));
    optimalSize = Math.max(5, optimalSize); // Make sure it's at least 5px
    
    return optimalSize;
  };
  
  // Get title pattern
  const getTitlePattern = () => {
    return {
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
  };
  
  // Initialize the grid with title
  const initializeGrid = () => {
    const newGrid = {};
    const title = "GABE HOUSE";
    const titlePattern = getTitlePattern();
    const titleWidth = title.length * 4 - 1;
    
    // Create title cells at center of a fixed imaginary grid (e.g. 1000x1000)
    const gridCenterX = 500;
    const gridCenterY = 250;
    const startX = gridCenterX - Math.floor(titleWidth / 2);
    const startY = gridCenterY;
    
    // Add title cells to grid
    for (let letterIndex = 0; letterIndex < title.length; letterIndex++) {
      const letter = title[letterIndex];
      const pattern = titlePattern[letter];
      
      if (pattern) {
        for (let y = 0; y < pattern.length; y++) {
          for (let x = 0; x < pattern[y].length; x++) {
            if (pattern[y][x] === 1) {
              const cellX = startX + letterIndex * 4 + x;
              const cellY = startY + y;
              const key = `${cellX},${cellY}`;
              newGrid[key] = { color: '#000000', isTitle: true };
            }
          }
        }
      }
    }
    
    return newGrid;
  };
  
  // Calculate viewport offset to keep title centered
  const calculateViewportOffset = () => {
    const title = "GABE HOUSE";
    const titleWidth = title.length * 4 - 1;
    
    // Fixed grid center points that won't change
    const gridCenterX = 500;
    const gridCenterY = 250;
    
    // Get reliable window dimensions for mobile
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    // Calculate viewport dimensions in grid cells - make sure to use current cellSize
    const viewportWidthInCells = Math.ceil(windowWidth / cellSize);
    const viewportHeightInCells = Math.ceil(windowHeight / cellSize);
    
    // Calculate offset to center the title - the important part
    const offsetX = gridCenterX - Math.floor(viewportWidthInCells / 2);
    
    // For mobile, adjust vertical position to be higher up
    const offsetY = gridCenterY - Math.floor(viewportHeightInCells * 0.35);
    
    return { x: offsetX, y: offsetY };
  };
  
  // Initialize and handle resize
  useEffect(() => {
    const handleResize = () => {
      // Update dimensions first
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      
      setDimensions({
        width: windowWidth,
        height: windowHeight
      });
      
      // Update cell size based on new dimensions
      const newCellSize = calculateOptimalCellSize();
      setCellSize(newCellSize);
    };
    
    // First initialization
    if (!initializedRef.current) {
      const initialGrid = initializeGrid();
      setGrid(initialGrid);
      initializedRef.current = true;
      
      // Do the initial calculations
      handleResize();
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Update viewport offset whenever cell size or dimensions change
  useEffect(() => {
    // Recalculate viewport offset to keep title centered
    setViewportOffset(calculateViewportOffset());
  }, [cellSize, dimensions]);
  
  // Handle cell click
  const handleClick = (e) => {
    const viewportX = Math.floor(e.clientX / cellSize);
    const viewportY = Math.floor(e.clientY / cellSize);
    
    // Convert viewport coordinates to grid coordinates
    const gridX = viewportX + viewportOffset.x;
    const gridY = viewportY + viewportOffset.y;
    
    // Create grid cell key
    const key = `${gridX},${gridY}`;
    
    // Don't override existing cells
    if (!grid[key]) {
      setGrid(prev => ({
        ...prev,
        [key]: { color: getRandomColor(), isTitle: false }
      }));
    }
  };
  
  // Convert grid cells to visible cells within the viewport
  const getVisibleCells = () => {
    const cells = [];
    
    // Get reliable window dimensions
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    const viewportWidthInCells = Math.ceil(windowWidth / cellSize);
    const viewportHeightInCells = Math.ceil(windowHeight / cellSize);
    
    // Check each potential cell in viewport
    for (let vx = 0; vx < viewportWidthInCells; vx++) {
      for (let vy = 0; vy < viewportHeightInCells; vy++) {
        // Convert to grid coordinates
        const gridX = vx + viewportOffset.x;
        const gridY = vy + viewportOffset.y;
        const key = `${gridX},${gridY}`;
        
        // If this cell exists in our grid, add it to visible cells
        if (grid[key]) {
          cells.push({
            x: vx,
            y: vy,
            color: grid[key].color,
            isTitle: grid[key].isTitle
          });
        }
      }
    }
    
    return cells;
  };
  
  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen fixed top-0 left-0 bg-white cursor-pointer overflow-hidden"
      onClick={handleClick}
      style={{ touchAction: 'manipulation' }} // Improve touch handling
    >
      {getVisibleCells().map((cell, index) => (
        <div
          key={`${cell.x}-${cell.y}-${index}`}
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