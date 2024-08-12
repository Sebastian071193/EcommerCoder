import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import data from "../data/productos.json";

export const ItemDetailsContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    new Promise((resolve) => setTimeout(() => resolve(data), 2000))
      .then((response) => {
        const foundItem = response.items.find((i) => i.id === Number(id));
        setItem(foundItem);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-4">
        <h1>Cargando...</h1>
        <p>
          Estamos obteniendo la información del artículo. Por favor, espera.
        </p>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container className="mt-4">
        <h1>Item no encontrado</h1>
        <p>
          Lo siento, no hemos podido encontrar el artículo que estás buscando.
        </p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6} className="d-flex justify-content-center">
          <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src={item.imageUrl} />
          </Card>
        </Col>
        <Col md={6}>
          <h1>{item.title}</h1>
          <h2>{item.category}</h2>
          <h3>{item.description}</h3>
          <p className="fw-bold fs-4">${item.price.toLocaleString()}</p>
          <Button variant="primary" onClick={() => handleAddToCart(item)}>
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const handleAddToCart = (item) => {
  alert(`${item.title} ha sido agregado al carrito.`);
};
