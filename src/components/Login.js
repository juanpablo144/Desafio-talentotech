import React, { useState } from 'react';
import "./Login.css";
import { Button, Form, FormGroup, } from 'react-bootstrap';
import { iAxios } from "../Services/Interceptors"

function Login() {


    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptance, setAcceptance] = useState('');
    const [respuesta, setRespuesta] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const respuesta = await iAxios.post('login', {
                "email": email,
                "password": password,
                "acceptance": acceptance
            });
            setRespuesta(respuesta.data)
            console.log(JSON.stringify(respuesta.data))
        } catch (error) {
            console.log("ERR:" + error.message)
        }
        setValidated(true);

    };

    return (
        <>
            <Form noValidate onSubmit={handleSubmit} validated={validated}>
                <FormGroup controlId='idEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type='email' placeholder='Correo Electronico' required onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Control.Feedback type='invalid'>
                        Correo Electronico no valido
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup controlId='idPassword'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control name='password' type='password' placeholder='Contraseña' required onChange={(e) => setPassword(e.target.value)}/>
                    <Form.Control.Feedback type='invalid'>
                        Contraseña no valida
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Tratamiento de datos</Form.Label>
                    <Form.Check type='radio' name='td' value={true} label="Si" onChange={(e) => setAcceptance(e.target.value)}/>
                    <Form.Check type='radio' name='td' value={false} label="No" onChange={(e) => setAcceptance(e.target.value)}/>
                </FormGroup>
                <Button variant='warning' type='submit'>Enviar</Button>
            </Form>
            <h1>Respuesta</h1>
            <p>{JSON.stringify(respuesta)}</p>
        </>
    )
}

export { Login }