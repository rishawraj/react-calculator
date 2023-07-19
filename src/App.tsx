import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [view, setView] = useState("");
  const [preview, setPreview] = useState("");
  const [operator, setOperator] = useState("");
  // const [decimal, setDecimal] = useState(false);
  const [negative, setNegative] = useState(false);

  const clickNumber = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const number = (e.target as HTMLElement)?.textContent;

    if (number === "." && value && !operator && !value2) {
      if (value.includes(".")) {
        return;
      }
    }

    if (number === "." && value && operator && value2) {
      if (value2.includes(".")) {
        return;
      }
    }

    if (!operator && number) {
      setValue((value) => value + number);
      setView((view) => view + number);
    } else if (operator && number) {
      setValue2((value2) => value2 + number);
      setView((view) => view + number);
    }
  };

  const clickOperator = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const operatorValue = (e.target as HTMLElement)?.textContent;

    if (operatorValue && value && operator && value2) {
      const res = calculate(value, operator, value2);
      setValue(res);
      setValue2("");
      setPreview(res);

      setOperator(operatorValue);
      setView(`${res} ${operatorValue} `);
    }

    if (operatorValue && operator && !value2) {
      setOperator(operatorValue);
      setView(`${value} ${operatorValue} ${value2}`);
    }

    if (value && !operator && operatorValue) {
      setOperator(operatorValue);
      setView(`${value} ${operatorValue} ${value2}`);
    }
  };

  const handleCalculation = () => {
    if (value && operator && value2) {
      const result = calculate(value, operator, value2);
      setValue(result);
      setOperator("");
      setValue2("");
      setView(result);
      setPreview("");
    }
  };

  const calculate = (num1: string, operator: string, num2: string): string => {
    let result = 0;

    switch (operator) {
      case "+":
        result = +num1 + +num2;
        break;
      case "-":
        result = +num1 - +num2;
        break;

      case "x":
        result = +num1 * +num2;
        break;

      case "÷":
        result = +num1 / +num2;
        break;
    }
    return "" + result;
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{preview}</div>
        <div className="current-operand">{view}</div>
      </div>
      <button
        className="span-two"
        onClick={() => {
          setValue("");
          setOperator("");
          setValue2("");
          setView("");
          setPreview("");
        }}
      >
        AC
      </button>
      <button
        onClick={() => {
          if (value && operator && value2) {
            setValue2((value) => value.slice(0, -1));
            setView((view) => view.slice(0, -1));
          } else if (value && operator && value2 === "") {
            setOperator("");
            setView((view) => view.slice(0, -3));
          } else {
            setValue((value) => value.slice(0, -1));
            setView((view) => view.slice(0, -1));
          }
        }}
      >
        DEL
      </button>
      <button onClick={clickOperator}>÷</button>
      <button onClick={clickNumber}>1</button>
      <button onClick={clickNumber}>2</button>
      <button onClick={clickNumber}>3</button>
      <button onClick={clickOperator}>x</button>
      <button onClick={clickNumber}>4</button>
      <button onClick={clickNumber}>5</button>
      <button onClick={clickNumber}>6</button>
      <button onClick={clickOperator}>+</button>
      <button onClick={clickNumber}>7</button>
      <button onClick={clickNumber}>8</button>
      <button onClick={clickNumber}>9</button>
      <button onClick={clickOperator}>-</button>
      <button onClick={clickNumber}>.</button>
      <button onClick={clickNumber}>0</button>
      <button className="span-two" onClick={handleCalculation}>
        =
      </button>
    </div>
  );
}

export default App;
