
import React, { useState } from 'react';
import { Operator, ButtonType } from './types';
import CalculatorButton from './components/CalculatorButton';

const App: React.FC = () => {
    const [display, setDisplay] = useState<string>('0');
    const [currentValue, setCurrentValue] = useState<number | null>(null);
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<Operator | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);

    const formatNumber = (num: number): string => {
        // Format to a reasonable precision to avoid floating point issues
        // and limit length for display.
        if (String(num).length > 10) {
            return num.toPrecision(7);
        }
        return String(num);
    }

    const calculate = (a: number, b: number, op: Operator): number => {
        switch (op) {
            case Operator.Add: return a + b;
            case Operator.Subtract: return a - b;
            case Operator.Multiply: return a * b;
            case Operator.Divide: return a / b;
        }
    };

    const handleNumberClick = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            if (display.length >= 10) return;
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const handleDecimalClick = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleOperatorClick = (nextOperator: Operator) => {
        const inputValue = parseFloat(display);

        if (operator && !waitingForOperand) {
            if (previousValue !== null) {
                const result = calculate(previousValue, inputValue, operator);
                const formattedResult = formatNumber(result);
                setDisplay(formattedResult);
                setPreviousValue(result);
            } else {
                setPreviousValue(inputValue);
            }
        } else {
            setPreviousValue(inputValue);
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const handleEqualsClick = () => {
        const inputValue = parseFloat(display);
        if (operator && previousValue !== null) {
            if (waitingForOperand) {
                // Handle pressing '=' multiple times
                const result = calculate(previousValue, previousValue, operator);
                const formattedResult = formatNumber(result);
                setDisplay(formattedResult);
                // No change to previousValue or operator
                return;
            }

            const result = calculate(previousValue, inputValue, operator);
            const formattedResult = formatNumber(result);
            setDisplay(formattedResult);
            setPreviousValue(result); // Allow for chaining calculations like 2+2=4, then +2=6
            setCurrentValue(null);
            // setOperator(null); // Keep operator for chained equality
            setWaitingForOperand(true);
        }
    };

    const handleClearClick = () => {
        setDisplay('0');
        setCurrentValue(null);
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
    };

    const handleToggleSignClick = () => {
        const currentValue = parseFloat(display);
        if (currentValue === 0) return;
        setDisplay(String(currentValue * -1));
    };

    const handlePercentClick = () => {
        const currentValue = parseFloat(display);
        setDisplay(String(currentValue / 100));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm mx-auto bg-black rounded-3xl p-6 shadow-2xl space-y-6">
                <div className="text-right text-white font-light text-7xl p-4 break-words">
                    {display}
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <CalculatorButton onClick={handleClearClick} label={display === '0' ? 'AC' : 'C'} type={ButtonType.Special} />
                    <CalculatorButton onClick={handleToggleSignClick} label="+/-" type={ButtonType.Special} />
                    <CalculatorButton onClick={handlePercentClick} label="%" type={ButtonType.Special} />
                    <CalculatorButton onClick={() => handleOperatorClick(Operator.Divide)} label="÷" type={ButtonType.Operator} />

                    <CalculatorButton onClick={() => handleNumberClick('7')} label="7" />
                    <CalculatorButton onClick={() => handleNumberClick('8')} label="8" />
                    <CalculatorButton onClick={() => handleNumberClick('9')} label="9" />
                    <CalculatorButton onClick={() => handleOperatorClick(Operator.Multiply)} label="×" type={ButtonType.Operator} />

                    <CalculatorButton onClick={() => handleNumberClick('4')} label="4" />
                    <CalculatorButton onClick={() => handleNumberClick('5')} label="5" />
                    <CalculatorButton onClick={() => handleNumberClick('6')} label="6" />
                    <CalculatorButton onClick={() => handleOperatorClick(Operator.Subtract)} label="-" type={ButtonType.Operator} />

                    <CalculatorButton onClick={() => handleNumberClick('1')} label="1" />
                    <CalculatorButton onClick={() => handleNumberClick('2')} label="2" />
                    <CalculatorButton onClick={() => handleNumberClick('3')} label="3" />
                    <CalculatorButton onClick={() => handleOperatorClick(Operator.Add)} label="+" type={ButtonType.Operator} />

                    <CalculatorButton onClick={() => handleNumberClick('0')} label="0" className="col-span-2" />
                    <CalculatorButton onClick={handleDecimalClick} label="." />
                    <CalculatorButton onClick={handleEqualsClick} label="=" type={ButtonType.Operator} />
                </div>
            </div>
        </div>
    );
};

export default App;
