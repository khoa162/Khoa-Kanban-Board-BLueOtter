import styled from "styled-components";
import { SCREEN_BREAKPOINTS } from "../../constants/breakpoints";

interface ContainerProps{
  isFirstColumn: boolean,
  columnName: string
}

export const Container = styled.div<ContainerProps>`
  width: 320px;

  ${({ isFirstColumn }) => isFirstColumn && `
    margin-left: 10rem;
  `}

  @media(max-width: ${SCREEN_BREAKPOINTS.EXTRA_LARGE}px) {
    ${({ isFirstColumn }) => isFirstColumn && `
    margin-left: 2rem;
    `}
  };
  background: ${props => (props.columnName)};
  h2 {
    color: white;
    text-align: center;
    font-size: 15px;
    padding-top: 10px 
  };
  border-radius: 5px 5px 0 0
`

export const CardsList = styled.div`
  margin-top: 1rem;
  width: 320px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f8f8fa;
  padding-bottom: 30px;
  padding-left: 10px;
`;