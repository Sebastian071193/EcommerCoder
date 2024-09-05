import { useContext, useState } from "react";
import { ItemsContext } from "../cont/ItemContext";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const initialValues = {
  phone: "",
  email: "",
  name: "",
};

export const Cart = () => {
  const [buyer, setBuyer] = useState(initialValues);
  const { items, reset, removeItem } = useContext(ItemsContext);

  const handleChange = (ev) => {
    setBuyer((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const total = items.reduce((acc, act) => acc + act.price * act.quantity, 0);

  const sendOrder = async () => {
    const order = { buyer, items, total };
    const db = getFirestore();
    const orderCollection = collection(db, "orders");

    try {
      const docRef = await addDoc(orderCollection, order);
      alert("Su orden: " + docRef.id + " ha sido completada!");
      reset();
      setBuyer(initialValues);
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  if (items.length === 0) {
    return (
      <Container className="mt-5">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para verlos aquí.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Carrito de Compras</h1>
      {items.map((item) => (
        <Card key={item.id} className="mb-3">
          <Row className="g-0">
            <Col md={4}>
              <Card.Img variant="top" src={item.imageId} alt={item.title} />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  <b>Cantidad:</b> {item.quantity}
                </Card.Text>
                <Card.Text>
                  <b>Precio unitario:</b> ${item.price}
                </Card.Text>
                <Card.Text>
                  <b>Subtotal:</b> ${item.quantity * item.price}
                </Card.Text>
                <Button variant="danger" onClick={() => removeItem(item.id)}>
                  Quitar 1
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
      <div className="d-flex justify-content-end mb-3">
        <Button variant="secondary" onClick={reset}>
          Vaciar Carrito
        </Button>
      </div>

      <h3>Total: ${total}</h3>

      <Form className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={buyer.name}
            name="name"
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            value={buyer.phone}
            name="phone"
            onChange={handleChange}
            placeholder="Ingresa tu teléfono"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={buyer.email}
            name="email"
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
          />
        </Form.Group>

        <Button variant="primary" onClick={sendOrder}>
          Comprar
        </Button>
      </Form>
    </Container>
  );
};
