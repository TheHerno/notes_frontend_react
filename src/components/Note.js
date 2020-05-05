import React from "react";
import { Col, Card, Button } from "react-bootstrap";

export default function Note({ note, onDelete, onEdit }) {
  const eliminar = () => {
    onDelete(note);
  };
  const editar = () => {
    onEdit(note);
  };
  return (
    <Col m={2} xs={4} md={2} lg={2} xl={2} className="mx-5 my-3">
      <Card style={{ width: "16rem" }}>
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={editar} type="button" variant="outline-primary" className="mx-1">
            Editar
          </Button>
          <Button onClick={eliminar} type="button" variant="outline-danger" className="mx-1">
            Eliminar
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}
