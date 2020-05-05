import React, { useState } from "react";
import { Button, Card, Form, Alert, Row, Col } from "react-bootstrap";
import UserModule from "../utils/UserModule";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Complete todos los campos");
    } else {
      try {
        const { data, error } = await axios.post("/signin", { email, password });
        if (data) {
          UserModule.token = data.token;
          setRedirect(true);
        } else {
          setError(error);
        }
      } catch (e) {
        setError("Ocurrió un error");
      }
    }
  };

  return (
    <Row className="justify-content-md-center">
      {(redirect || UserModule.logged) && <Redirect to="/notes" />}
      <Col m={8} xs={12} md={6} lg={4} xl={4}>
        <Card>
          <Card.Body>
            <Card.Title>Iniciar Sesión</Card.Title>
            <Card.Text>
              <Form onSubmit={submitForm}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="devil666@yahoo.com"
                    value={email}
                    onChange={updateEmail}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={updatePassword}
                    type="password"
                    placeholder="********"
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type="submit" variant="primary">
                  Iniciar sesión
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
