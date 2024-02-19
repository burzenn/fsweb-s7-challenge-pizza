import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Nav, NavItem, Card, CardTitle, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MalzemelerComp from "./MalzemelerComp";
import malzemeler from './malzemeler.json';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from 'react-router-dom';
import axios from 'axios';




const initialFormData = {
    boyut: '',
    hamur: 'Hamur kalınlığı',
    ekmalzemeler: [],
    ad: '',
    siparisnotu: '',
};

const initialErrors = {
    boyut: false,
    hamur: false,
    ekmalzemeler: false,
    ad: false,
    siparisnotu: false,
};

const errorMessages = {
    boyut: "Lütfen pizza boyutunuzu seçiniz",
    hamur: "Lütfen hamur kalınlığını seçiniz",
    ekmalzemeler: "Lütfen minimum 4 maximum 10 malzeme seçiniz",
    ad: "Lütfen minimum 4 harf şeklinde isminizi yazınız",
}

const FormContainer = styled.div`
    width: 50%;
    margin: 10px auto;
    place-items: center;
    display: grid;
    justify-content: center;
    align-items: flex-start;
    color: rgba(95, 95, 95, 1); 
    fontSize: 16px; 
    fontFamily: "Barlow";
   
    & > form > div {
        margin-bottom: 1rem; /* Her FormGroup bileşeni arasında 5rem boşluk */
    }
`;

const Header = styled.header`
    width: 100%;
    height: 180px;
    margin: 0 auto;
    background: linear-gradient(0deg, #C20608, #C20608),linear-gradient(0deg, #CE2829, #CE2829);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(255, 255, 255, 1);
    padding-top: 30px;
    padding-bottom: 15px;
`;

const HeaderCont = styled.div`
    width: 50%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h1`
    color: white;
    text-align: center;
`;

const EkDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    margin-top: 20px;
     
`;

const EndBox = styled.div`
    display: flex;
    align-items: flex-start;
    border-top: 1px solid;
    padding-top: 2rem;
`

const CounterWrapper = styled.div`
    display: flex;
    flex-wrapper: wrap;
    flex: 1;
    align-items: center;
`;

const CounterButton = styled.button`
    background: rgba(253, 201, 19, 1);
    color: black;
    border: 1px solid rgba(217, 217, 217, 1);
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
`;





export default function OrderPizza() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [secimler, setSecimler] = useState(0);

    const history = useHistory();

    const handleToMainPage = () => {
        history.push("/");
    };


    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        let newValue;

        if (type === 'checkbox') {
            const oldValues = formData[name];
            newValue = checked ? [...oldValues, value] : oldValues.filter(v => v !== value);
            const changeAmount = checked ? 5 : -5;
            setSecimler(prevSecimler => prevSecimler + changeAmount);
        } else {
            newValue = value;
        }

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const validateForm = () => {
        let newErrors = {};

        if (formData.ekmalzemeler.length < 4 || formData.ekmalzemeler.length > 10) {
            newErrors.ekmalzemeler = "En az 4, en fazla 10 malzeme seçmelisiniz.";
        }

        if (formData.ad.length < 4) {
            newErrors.ad = "İsim en az 4 karakter olmalıdır.";
        }

        return newErrors;
    };

    useEffect(() => {
        const newErrors = validateForm();
        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [formData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setFormData(prevFormData => ({
                ...prevFormData,
                quantity: quantity
            }));
            axios.post('https://run.mocky.io/v3/d90048b5-42f4-4de1-a353-a97d278e52c7', formData)
                .then(response => {
                    // Sunucudan gelen cevabı kontrol et
                    if (response.status === 200) {
                        console.log("Form verileri başarıyla gönderildi:", response.data);
                        // Burada form verilerini gönderme işlemi başarılı olduğunda yapılacak işlemleri gerçekleştiriyorum
                        // Response okaysa sipariş tamamlandı sayfasına yönlendiriyorum
                        history.push("/Completed");
                    } else {
                        console.error("Sunucu hatası:", response.statusText);
                    }
                })
                .catch(error => {
                    console.error("Hata:", error.message);
                });
        } else {
            setErrors(newErrors);
        }
    };

    const increaseQuantity = (event) => {
        event.preventDefault();
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = (event) => {
        event.preventDefault();
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    };



    return (
        <>
            <Header>
                <HeaderCont>
                    <Title>Teknolojik Yemekler</Title>
                    <Nav style={{ alignSelf: 'flex-start', color: "white" }}>
                        <NavItem>
                            <NavLink to="/" exact style={{ textDecoration: 'none', color: "white" }}>
                                Anasayfa
                            </NavLink>
                        </NavItem>
                        <span style={{ margin: " 0 0.5rem" }}> - </span>
                        <NavItem>
                            <NavLink to="/OrderPizza" style={{ textDecoration: 'none', color: "white" }}>
                                Siparişi Oluştur
                            </NavLink>
                        </NavItem>
                    </Nav>

                </HeaderCont>

            </Header>


            <FormContainer>

                <Form>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "rgba(41, 41, 41, 1)" }}>Position Absolute Acı Pizza</div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <p style={{ flex: 2, fontSize: "28px", fontWeight: "bold", color: "rgba(41, 41, 41, 1)" }}>85.50₺</p>
                        <p style={{ flex: 1, alignSelf: "flex-end", textAlign: "right" }}>4.9</p>
                        <p style={{ flex: 1, alignSelf: "flex-end", textAlign: "right" }}>(200)</p>
                        <div>Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.</div>
                    </div>


                    <FormWrapper>
                        <FormGroup style={{ flex: 1 }}>
                            <legend style={{ fontSize: "20px", fontWeight: "bold", color: "rgba(41, 41, 41, 1)" }}> Boyut Seç * </legend>
                            <FormGroup check>
                                < Input
                                    name="boyut"
                                    type="radio"
                                    invalid={errors.boyut}
                                    onChange={handleChange}
                                    value="küçük"
                                />
                                {' '}
                                <Label check>
                                    Küçük
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input
                                    name="boyut"
                                    type="radio"
                                    invalid={errors.boyut}
                                    onChange={handleChange}
                                    value="orta"
                                />
                                {' '}
                                <Label check>
                                    Orta
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input
                                    name="boyut"
                                    type="radio"
                                    invalid={errors.boyut}
                                    onChange={handleChange}
                                    value="büyük"
                                />
                                {' '}
                                <Label check>
                                    Büyük
                                </Label>
                            </FormGroup>
                            {errors.boyut && <FormFeedback> {errorMessages.boyut}</FormFeedback>}

                        </FormGroup>

                        <FormGroup style={{ flex: 1 }}>
                            <legend style={{ fontSize: "20px", fontWeight: "bold", color: "rgba(41, 41, 41, 1)" }}> Hamur Seç * </legend>
                            <Input
                                id="hamur"
                                name="hamur"
                                type="select"
                                invalid={errors.hamur}
                                onChange={handleChange}
                            >
                                <option>
                                    Hamur Kalınlığı
                                </option>
                                <option>
                                    İnce
                                </option>
                                <option>
                                    Normal
                                </option>
                                <option>
                                    Kalın
                                </option>
                            </Input>
                            {errors.hamur && <FormFeedback> {errorMessages.hamur}</FormFeedback>}
                        </FormGroup>
                    </FormWrapper>



                    <FormGroup style={{ grid: 1 }}>
                        <legend style={{ fontSize: "20px", fontWeight: "bold", color: "rgba(41, 41, 41, 1)" }}> Ek Malzemeler </legend>
                        <p>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
                        <EkDiv>
                            {malzemeler.map((malzeme) => (
                                <MalzemelerComp
                                    key={malzeme.value}
                                    changeFn={handleChange}
                                    isChecked={formData.ekmalzemeler.includes(malzeme.value)}
                                    fieldName="ekmalzemeler"
                                    value={malzeme.value}
                                    label={malzeme.label}
                                    style={{
                                        width: "30%", fontWeight: "bold", marginBottom: "10px", fontSize: "13px"
                                    }}

                                />
                            ))}
                        </EkDiv>
                        {errors.ekmalzemeler && <FormFeedback>{errorMessages.ekmalzemeler}</FormFeedback>}

                    </FormGroup>

                    <FormGroup>
                        <legend style={{ fontSize: "20px", fontWeight: "bold", color: "rgba(41, 41, 41, 1)" }}> Ad Soyad </legend>
                        <Input
                            id="ad"
                            name="ad"
                            invalid={errors.ad}
                            type="textarea"
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <legend style={{ fontSize: "20px", fontWeight: "bold", color: "rgba(41, 41, 41, 1)" }}> Sipariş Notu </legend>
                        <Input
                            id="siparisnotu"
                            name="siparisnotu"
                            type="textarea"
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <EndBox>
                        <CounterWrapper>
                            <CounterButton onClick={decreaseQuantity}>-</CounterButton>
                            <span>{quantity}</span>
                            <CounterButton onClick={increaseQuantity}>+</CounterButton>
                        </CounterWrapper>
                        <div style={{ width: '100%', flex: 2 }}>
                            <Card body className="my-2" >
                                <CardTitle tag="h5" style={{ fontSize: "20px", fontWeight: "bold", color: "rgba(41, 41, 41, 1)" }}>
                                    Sipariş Toplamı
                                </CardTitle>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div >
                                        <CardText> Seçimler</CardText>
                                        <CardText> Toplam</CardText>
                                    </div>
                                    <div>
                                        <CardText> {secimler.toFixed(2)}₺</CardText>
                                        <CardText> {quantity * (85 + secimler)}.00₺</CardText>
                                    </div>

                                </div>

                            </Card>
                            <Button style={{ margin: "0", paddin: "0", width: "100%" }} disabled={!isValid} color="warning" onClick={handleSubmit}>
                                SİPARİŞİ VER
                            </Button>
                        </div>
                    </EndBox>
                </Form>
            </FormContainer >
        </>
    );
}