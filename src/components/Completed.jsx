import React from "react";
import styled from "styled-components";


const Completed1 = styled.div`
  width: 100vw; 
  height: 100vh;
  background: linear-gradient(0deg, #C20608, #C20608),linear-gradient(0deg, #CE2829, #CE2829);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Content1 = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  color: white;
  margin-top: 90px;
  
`;

const Title2 = styled.h1`
  color: white;
  font-size: 40px;
  margin-bottom: 20px;
`;

const H1 = styled.h1`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 60px;
    font-weight: 325;
    line-height: 65px;
    letter-spacing: 0.1px;
    text-align: center;
    width: 580px;
    height: 195px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default function Completed() {
    return (
        <Completed1>
            <Content1>
                <Title2>Teknolojik Yemekler</Title2>
                <H1>TEBRİKLER! SİPARİŞİNİZ ALINDI!</H1>
            </Content1>
        </Completed1>
    );
}



