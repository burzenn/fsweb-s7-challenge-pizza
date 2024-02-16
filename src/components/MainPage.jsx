import React from "react";
import styled from "styled-components";
import backgroundImage from "../assets/mile1-assets/home-banner.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Container = styled.div`
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  display-direction: coloum;
  justify-content: center;
  align-items: center;
`;


const Content = styled.div`
  text-align: center;
  color: white;
`;

export default function MainPage() {

    const history = useHistory();

    const handleButtonClick = () => {
        history.push("/OrderPizza");
    };

    return (
        <Container>
            <Content>
                <h3>Teknolokij Yemekler</h3>
                <h1>KOD ACIKTIRIR</h1>
                <h1>PİZZA, DOYURUR</h1>
                <button onClick={handleButtonClick}>ACIKTIM</button>
            </Content>
        </Container>
    );
}