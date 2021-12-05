import { useReducer } from 'react';

import { validateInput }  from './api';
import reducer, { ActionType, PIN_LENGTH } from './pinInput.reducer';
import PinInputGrid from './PinInputGrid';
import './App.css';


function App() {

  const [{pin, validationData}, dispatch] = useReducer(reducer, {
    pin: new Array(PIN_LENGTH),
    validationData: {}
  })

  const onPinChanged = (pinEntry: number | undefined, index: number) => {
    const newPin = [...pin];
    newPin[index] = pinEntry;
    dispatch({ type: ActionType.SET_PIN, pin: newPin })
  };

  const validatePin = async () => {
    try {
      const message = await validateInput(pin.join(''));
      dispatch({ 
        type: ActionType.SET_VALIDATION_DATA, 
        validationData: { message, result: true }
      })
    } catch (e: any) {
      dispatch({ 
        type: ActionType.SET_VALIDATION_DATA, validationData: {
          message: e,
          result: false
        }
      })
    }
  };

  return (
    <div className="App">
      <PinInputGrid 
        onPinChanged={onPinChanged} 
        pin={pin}
        pinLength={PIN_LENGTH}
        validationMessage={validationData.message}
        validationResult={validationData.result}
      />
      <button onClick={validatePin}>validate</button>
      <button onClick={() => dispatch({ 
        type: ActionType.RESET
      })}>
        clear
      </button>
    </div>
  );
}

export default App;
