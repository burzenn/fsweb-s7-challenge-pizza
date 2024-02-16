import React, { useEffect } from 'react';
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MalzemelerComp from "./MalzemelerComp";
import malzemeler from './malzemeler.json';



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




export default function OrderPizza() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(false);


    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        let newValue;

        if (type === 'checkbox') {
            const oldValues = formData[name];
            newValue = checked ? [...oldValues, value] : oldValues.filter(v => v !== value);
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
            console.log("Form Data:", formData);
            // Burada form verilerini gönderme işlemi gerçekleştirilebilir
        } else {
            setErrors(newErrors);
        }
    };


    return (
        <>
            <header>
                <h1>Teknolojik Yemekler</h1>
                <Nav>
                    <NavItem>
                        <NavLink
                            href="./MainPage"
                        >
                            Anasayfa
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active href="./Deneme">
                            Siparişi Oluştur
                        </NavLink>
                    </NavItem>
                </Nav>
            </header>


            <div>
                <Form>
                    <FormGroup>
                        <FormGroup>
                            <Label> Boyut Seç </Label>
                            <FormGroup check>
                                <Input
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
                            {errors.boyut && <FormFeedback> {errorMessages.email}</FormFeedback>}

                        </FormGroup>

                        <FormGroup>
                            <legend> Hamur Seç </legend>
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
                    </FormGroup>



                    <FormGroup>
                        <legend> Ek Malzemeler </legend>
                        {malzemeler.map((malzeme) => (
                            <MalzemelerComp
                                key={malzeme.value}
                                changeFn={handleChange}
                                isChecked={formData.ekmalzemeler.includes(malzeme.value)}
                                fieldName="ekmalzemeler"
                                value={malzeme.value}
                                label={malzeme.label}
                            />
                        ))}
                        {errors.ekmalzemeler && <FormFeedback>{errorMessages.ekmalzemeler}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <legend> Ad Soyad </legend>
                        <Input
                            id="ad"
                            name="ad"
                            invalid={errors.ad}
                            type="textarea"
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <legend> Sipariş Notu </legend>
                        <Input
                            id="siparisnotu"
                            name="siparisnotu"
                            type="textarea"
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <Button disabled={!isValid} color="warning" onClick={handleSubmit}>
                        SİPARİŞİ VER
                    </Button>
                </Form>

            </div>






        </>
    );
}