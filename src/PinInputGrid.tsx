import React, { useRef } from 'react';

import { removeValuesFromArray } from './pin.utils';
import { StyledPinInput, ValidationResultParagraph } from './Pin.components';

interface PinInputGridProps {
  pin: Array<number | undefined>;
  onPinChanged: (pinEntry: number | undefined, index: number) => void;
  pinLength: number;
  validationMessage: string | undefined;
  validationResult: boolean | undefined;
};

const PIN_MIN_VALUE = 0;
const PIN_MAX_VALUE = 9;
const BACKSPACE_KEY = 'Backspace';

const PinInputGrid: React.FC<PinInputGridProps> = ({ 
  pin,
  onPinChanged, 
  pinLength,
  validationMessage,
  validationResult
}) => {

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const changePinFocus = (pinIndex: number) => {
    const ref = inputRefs.current[pinIndex]
    if (ref) {
      ref.focus()
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const previousValue = e.target.defaultValue;
    const valuesArray = e.target.value.split('');

    removeValuesFromArray(valuesArray, previousValue);
    const value = valuesArray.pop();
    if (!value) {
      return;
    }

    const pinNumber = Number(value.trim());
      if (isNaN(pinNumber) || value.length === 0) {
        return;
      }
      if (pinNumber >= PIN_MIN_VALUE && pinNumber <= PIN_MAX_VALUE) {
        onPinChanged(pinNumber, index);
        if (index < pinLength - 1) {
          changePinFocus(index + 1)
        }
      };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const keyboardKeyCode = e.nativeEvent.code;
    if (keyboardKeyCode !== BACKSPACE_KEY) {
      return;
    } 
    if (pin[index] === undefined) {
      changePinFocus(index - 1)
    } else {
      onPinChanged(undefined, index)
    }
  };

  return (
    <>
      <div>
        {Array.from({length: pinLength}, (_, index) => (
          <StyledPinInput 
            key={index}
            onKeyDown={e => handleKeyDown(e, index)}
            ref={el => {
              if(el){
                inputRefs.current[index] = el;
              }
            }} 
            onChange={e => handleChange(e, index)}
            value={pin[index] || ''}
            isCorrect={validationResult}
          />
        ))}
      </div>
      <ValidationResultParagraph isCorrect={validationResult}>
        {validationMessage}
      </ValidationResultParagraph>
    </>
  );
}

export default PinInputGrid