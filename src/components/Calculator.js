import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import { evaluate, sqrt, pow, log10, log, factorial, sin, cos, tan, random, exp, sinh, cosh, tanh } from 'mathjs';
import ConfettiExplosion from 'react-confetti-explosion';

const Calculator = () => {
  // State variables for calculator operations and display
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [memory, setMemory] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [angleUnit, setAngleUnit] = useState('deg'); // Default angle unit is degrees

  // Handle button clicks
  const handleButtonClick = (label) => {
    switch (label) {
      case 'C':
        setInput(''); // Clear input
        setResult(null); // Clear result
        break;
      case '=':
        calculateResult(); // Calculate result
        break;
      case 'AC':
        setInput(''); // Clear input
        setResult(null); // Clear result
        setMemory(0); // Clear memory
        break;
      case 'MC':
        setMemory(0); // Clear memory
        break;
      case 'M+':
        setMemory(memory + (result || parseFloat(input))); // Add to memory
        break;
      case 'M-':
        setMemory(memory - (result || parseFloat(input))); // Subtract from memory
        break;
      case 'MR':
        setInput(memory.toString()); // Recall memory value
        break;
      case '+/-':
        setInput((prevInput) => (-parseFloat(prevInput)).toString()); // Toggle sign
        break;
      case '%':
        setInput((prevInput) => (parseFloat(prevInput) / 100).toString()); // Percentage calculation
        break;
      case '²√x':
        setInput((prevInput) => sqrt(parseFloat(prevInput)).toString()); // Square root
        break;
      case '³√x':
        setInput((prevInput) => pow(parseFloat(prevInput), 1 / 3).toString()); // Cube root
        break;
      case 'x!':
        setInput((prevInput) => factorial(parseFloat(prevInput)).toString()); // Factorial
        break;
      case 'sin':
      case 'cos':
      case 'tan':
        setInput((prevInput) => {
          const angle = angleUnit === 'deg' ? (parseFloat(prevInput) * Math.PI) / 180 : parseFloat(prevInput); // Convert to radians if in degrees
          const trigFunc = { sin, cos, tan };
          return trigFunc[label](angle).toString(); // Evaluate trigonometric function
        });
        break;
      case 'sinh':
      case 'cosh':
      case 'tanh':
        setInput((prevInput) => {
          const hyperbolicFunc = { sinh, cosh, tanh };
          return hyperbolicFunc[label](parseFloat(prevInput)).toString(); // Evaluate hyperbolic function
        });
        break;
      case 'Rand':
        setInput(random().toString()); // Generate random number
        break;
      case 'Rad':
        setAngleUnit(angleUnit === 'deg' ? 'rad' : 'deg'); // Toggle angle unit between degrees and radians
        break;
      case 'log₁₀':
        setInput((prevInput) => log10(parseFloat(prevInput)).toString()); // Base 10 logarithm
        break;
      case 'ln':
        setInput((prevInput) => log(parseFloat(prevInput)).toString()); // Natural logarithm
        break;
      case 'x²':
        setInput((prevInput) => pow(parseFloat(prevInput), 2).toString()); // Square
        break;
      case 'x³':
        setInput((prevInput) => pow(parseFloat(prevInput), 3).toString()); // Cube
        break;
      case 'x^y': // Handle internally using pow function
        setInput((prevInput) => {
          if (!prevInput.endsWith('^')) {
            return prevInput + '^'; // Append '^' for exponentiation
          } else {
            return prevInput; // Avoid appending multiple '^'
          }
        });
        break;
      case '¹/x':
        try {
          setInput((prevInput) => (1 / parseFloat(prevInput)).toString()); // Inverse calculation
        } catch {
          setInput('Error'); // Handle errors gracefully
        }
        break;
      case 'eˣ':
        setInput((prevInput) => exp(parseFloat(prevInput)).toString()); // Exponential function
        break;
      case '10ˣ':
        setInput((prevInput) => pow(10, parseFloat(prevInput)).toString()); // Base 10 exponentiation
        break;
      case 'π':
        setInput((prevInput) => prevInput + Math.PI.toString()); // Append π constant
        break;
      case 'e':
        setInput((prevInput) => prevInput + Math.E.toString()); // Append e constant
        break;
      default:
        setInput((prevInput) => prevInput + label); // Concatenate digits or operators
        break;
    }
  };

  // Calculate result
  const calculateResult = () => {
    try {
      // Evaluate input expression using mathjs evaluate function
      const evaluation = evaluate(input);
      setResult(evaluation); // Set result
      setInput(evaluation.toString()); // Update input to show result

      // Check for confetti trigger dynamically
      const regex = /(\d+\.?\d*)([\+\-\*\/])(\d+\.?\d*)/;
      const match = input.match(regex);
      if (match) {
        const operand1 = parseFloat(match[1]);
        const operand2 = parseFloat(match[3]);

        // Check if both operands exist before performing the confetti check
        if (!isNaN(operand1) && !isNaN(operand2)) {
          if ((operand1 === 2 && operand2 === 6) || (operand1 === 6 && operand2 === 2)) {
            setConfetti(true); // Activate confetti animation
            setTimeout(() => setConfetti(false), 3000); // Deactivate confetti after 3 seconds
          }
        }
      }
    } catch (error) {
      setInput('Error'); // Display 'Error' in case of evaluation error
      console.log('Evaluation Error:', error); // Log the error for debugging
    }
  };

  return (
    <div className="calculator">
      <Display value={input || result || '0'} /> {/* Display component for input or result */}
      <div className="buttons">
        {confetti && <ConfettiExplosion />} {/* Confetti explosion animation */}
        {['(', ')', 'MC', 'M+', 'M-', 'MR', 'C', '+/-', '%', '÷',
          '2nd', 'x²', 'x³', 'x^y', 'eˣ', '10ˣ', '7', '8', '9', '×',
          '¹/x', '²√x', '³√x', 'y√x', 'ln', 'log₁₀', '4', '5', '6', '−',
          'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
          'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
        ].map((btn, index) => (
          <Button key={index} label={btn} onClick={() => handleButtonClick(btn)} /> // Button component for each calculator function
        ))}
      </div>
    </div>
  );
};

export default Calculator;
