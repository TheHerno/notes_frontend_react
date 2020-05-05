import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Alert } from "react-bootstrap";
import axios from "axios";
import Note from "./Note";

export default function Notes() {
  const [allNotes, setAllNotes] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  const updateTitle = (e) => setNote({ ...note, title: e.target.value });
  const updateContent = (e) => setNote({ ...note, content: e.target.value });

  const getAllNotes = async () => {
    setError2("");
    try {
      const { data, error } = await axios.get("/notes");
      if (error) {
        setError2(error);
      } else {
        setAllNotes(data);
      }
    } catch (e) {
      setError2(e);
    }
  };

  const cancel = () => {
    setError("");
    setNote({ title: "", content: "" });
    setModalDelete(false);
    setModalEdit(false);
    setEditing(false);
  };

  const handleDelete = (note) => {
    setNote(note);
    setModalDelete(true);
  };

  const handleEdit = (note) => {
    setNote(note);
    setModalEdit(true);
    setEditing(true);
  };

  const handleAdd = () => {
    setNote({ title: "", content: "" });
    setEditing(false);
    setModalEdit(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { error } = editing
      ? await axios.put("/notes/" + note._id, note)
      : await axios.post("/notes", note);
    if (error) {
      setError(error);
    } else {
      cancel();
      getAllNotes();
    }
  };

  const submitDelete = async () => {
    const { error } = await axios.delete("/notes/" + note._id);
    if (error) {
      setError2(error);
    } else {
      getAllNotes();
      cancel();
    }
  };

  useEffect(() => {
    try {
      getAllNotes();
    } catch (e) {
      setError2(e);
    }
  }, []);

  return (
    <div>
      <Modal onHide={cancel} show={modalEdit}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Editar" : "Crear"} Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="#" onSubmit={submitForm}>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese Título"
                value={note.title}
                onChange={updateTitle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contenido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese Contenido"
                value={note.content}
                onChange={updateContent}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {error2 && <Alert variant="danger">{error2}</Alert>}
      <Modal onHide={cancel} show={modalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirma eliminar <u>{note.title}</u>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancel}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={submitDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="mb-3">
        <Button onClick={handleAdd} variant="outline-primary">
          Agregar
        </Button>
      </Row>
      <Row>
        {allNotes.map((n) => (
          <Note onEdit={handleEdit} onDelete={handleDelete} note={n} />
        ))}
      </Row>
    </div>
  );
}
