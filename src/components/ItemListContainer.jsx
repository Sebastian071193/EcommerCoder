import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import data from "../data/productos.json";
import Card from "react-bootstrap/Card";

console.log(data);

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    new Promise((resolve, reject) => setTimeout(resolve(data), 2000))
      .then((response) => setItems(response))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return "wait";

  return (
    <Container className="mt-4 d-flex">
      {items.map((i) => (
        <Card key={i.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={i.imageUrl} />
          <Card.Body>
            <Card.Title>{i.title}</Card.Title>
            <Card.Text>{i.description}</Card.Text>
            <Card.Text>{i.category}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
