import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import UserModule from "../utils/UserModule";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setError("Complete todos los campos");
    } else {
      try {
        const { data, error } = await axios.post("/signup", { email, password, username });
        if (data) {
          const { data, error } = await axios.post("/signin", { email, password });
          if (data) {
            UserModule.token = data.token;
            setRedirect(true);
          }
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
            <Card.Title>Registrarse</Card.Title>
            <Card.Text>
              <Form onSubmit={submitForm}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo666@hotmail.com"
                    value={email}
                    onChange={updateEmail}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="JuanitoMasterRace123"
                    value={username}
                    onChange={updateUsername}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="**********"
                    value={password}
                    onChange={updatePassword}
                  />
                </Form.Group>
                {error && <Alert varian="danger">{error}</Alert>}
                <Button type="submit" variant="primary">
                  Registrarse
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
