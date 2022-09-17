import styled from "styled-components";
import { SCREEN_BREAKPOINTS } from "../../constants/breakpoints";

export const Container = styled.div` 
    width: 200px;
    padding: 5px 15px;
    margin: 2rem 0 0 4rem;
    border-radius: 5px;
    // background: ${({ theme }) => theme.colors.primary};
    align-items: left;
    background: white;
    justify-items: center;
    display: flex;
    -webkit-box-shadow: 2px 5px 10px 2px rgba(0,0,0,0.11); 
    box-shadow: 2px 5px 10px 2px rgba(0,0,0,0.11);
    cursor: pointer;
    strong{
        color: ${({ theme }) => theme.colors.components_background};
        font-size: 1.5rem;
        font-weight: bold;
        color: black
    }

    @media(max-width: ${SCREEN_BREAKPOINTS.EXTRA_LARGE}px) {
      margin: 2rem 2rem 0 2rem;
    }

    @media(max-width: ${SCREEN_BREAKPOINTS.MEDIUM}px) {
      width: calc(100% - 4rem);
      top: 90vh;
      left:80vw;

      strong{
        font-size: 1.5rem;
      }
    }
`