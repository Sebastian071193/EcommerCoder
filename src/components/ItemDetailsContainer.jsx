import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ItemCount } from "./ItemCount";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ItemsContext } from "../cont/ItemContext";

export const ItemDetailsContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addItem } = useContext(ItemsContext);

  useEffect(() => {
    const db = getFirestore();
    const refDoc = doc(db, "items", id);

    getDoc(refDoc)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setItem({ ...snapshot.data(), id: snapshot.id });
        } else {
          console.log("El artículo no existe.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el detalle del artículo:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (quantity) => {
    if (item) {
      addItem({ ...item, quantity });
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <h1>Cargando...</h1>
        <p>Estamos obteniendo la información del artículo. Por favor, espera.</p>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container className="mt-4">
        <h1>Artículo no encontrado</h1>
        <p>No hemos podido encontrar el artículo que buscas.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6} className="d-flex justify-content-center">
          <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src={item.imageId} />
          </Card>
        </Col>
        <Col md={6}>
          <h1>{item.title}</h1>
          <h2>{item.category}</h2>
          <h3>{item.description}</h3>
          <b>Cantidad disponible: {item.stock}</b>
          <ItemCount stock={item.stock} onAdd={handleAddToCart} />
          <p className="fw-bold fs-4">${item.price.toLocaleString()}</p>
        </Col>
      </Row>
    </Container>
  );
};
