import React from 'react';

// Display component to render the calculator input/output
const Display = ({ value }) => {
  return (
    <div className="display">
      {value} {/* Display the value passed as props */}
    </div>
  );
};

export default Display;
