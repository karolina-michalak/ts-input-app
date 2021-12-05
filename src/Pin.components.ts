import styled from 'styled-components';

interface Props { 
  isCorrect?: boolean;
}

export const StyledPinInput = styled.input<Props>`
  width: 35px;
  height: 35px;
  border: 2px solid;
  font-size: 12px;
  text-align: center;
  margin: 8px;
  font-family: 'dotsfont';
  border-color: ${props => {
    switch (props.isCorrect) {
      case true:
        return 'green'
      case false:
        return 'red'
      default: 
        return '#c3c3c3'
    }
  }}
`;

export const ValidationResultParagraph = styled.p<Props>`
  color: ${props => props.isCorrect ? 'green' : 'red'};
`;