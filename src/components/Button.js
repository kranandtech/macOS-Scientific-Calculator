import React from 'react';

// Button component for calculator buttons
const Button = ({ label, onClick }) => {
  let className = 'button';

  // Add specific classes based on the button label
  if (label === '0') {
    className += ' zero'; // Add 'zero' class for the '0' button
  } else if (['÷', '×', '−', '+', '='].includes(label)) {
    className += ' orange'; // Add 'orange' class for operator buttons
  }

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
