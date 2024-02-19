import React from "react";
import styled from "styled-components";
import backgroundImage from "../assets/mile1-assets/home-banner.png"; // Import your image here
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";

const Container = styled.div`
  width: 100vw; /* Use viewport width to cover the entire width of the viewport */
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Content = styled.div`
  text-align: center;
  color: white;
  margin-top: 12rem;
`;

const Title1 = styled.h1`
  color: white;
  font-size: 40px;
  margin-bottom: 20px;
`;

const H1 = styled.h1`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 70px;
    font-weight: 325;
    line-height: 65px;
    letter-spacing: 0.1px;
    text-align: center;
    width: 580px;
    height: 195px;
    top: 35px;
    left: -53.22px;
`

const StyledButton = styled(Button)`
    border-radius: 30px;
    padding: 8px 30px;
    font-size: 18px;
    color: rgba(41, 41, 41, 1);

`;


export default function MainPage() {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push("/OrderPizza");
    };

    return (
        <Container>
            <Content>
                <Title1>Teknolojik Yemekler</Title1>
                <H1>KOD AÇIKTIRIR PİZZA, DOYURUR</H1>

                <StyledButton onClick={handleButtonClick} color="warning">ACIKTIM</StyledButton>
            </Content>
        </Container>
    );
}