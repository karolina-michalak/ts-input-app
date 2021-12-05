const VALID_PIN = '6666';

export const validateInput = (pinToCheck: string): Promise<string> => 
  new Promise((resolve, reject) => 
    setTimeout(() => {
      if(pinToCheck === VALID_PIN) {
        resolve('pin is valid')
      } else {
        reject('invalid pin')
      }
    }, 1000
  )
);