export enum ActionType {
  SET_PIN = "SET_PIN",
  SET_VALIDATION_DATA = "SET_VALIDATION_DATA",
  RESET = "RESET"
};

interface ValidationData { 
  message?: string;
  result?: boolean;
};

interface State {
  pin: Array<number | undefined>;
  validationData: ValidationData;
};

export const PIN_LENGTH = 4;

type Action = 
 | { type: ActionType.SET_PIN, pin: Array<number | undefined> }
 | { type: ActionType.SET_VALIDATION_DATA, validationData: ValidationData }
 | { type: ActionType.RESET }


const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_PIN:
      return {
        ...state,
        pin: action.pin
      }
    case ActionType.SET_VALIDATION_DATA: 
      return {
        ...state,
        validationData: action.validationData
      }
    case ActionType.RESET:
      return {
        validationData: {
          message: undefined,
          result: undefined
        },
        pin: new Array(PIN_LENGTH)
      }

  }
};

export default reducer;
