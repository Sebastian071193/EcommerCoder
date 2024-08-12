import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";

import data from "../data/productos.json";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    new Promise((resolve, reject) => setTimeout(resolve(data), 2000))
      .then((response) => {
        if (!id) {
          setItems(response.items);
        } else {
          const filtered = response.items.filter((i) => i.category === id);
          setItems(filtered);
        }
      })
      .finally(() => setLoading(false));
  }, [!id]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="g-4">
        {items.map((i) => (
          <Col key={i.id} md={4} sm={6} xs={12}>
            <Card className="h-100 shadow-sm border-0">
              <div
                style={{
                  height: "200px",
                  width: "100%",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card.Img
                  variant="top"
                  src={i.imageUrl}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{i.title}</Card.Title>
                <Card.Text className="text-muted">{i.description}</Card.Text>
                <Card.Text className="text-muted">{i.category}</Card.Text>
                <Card.Text className="fw-bold text-primary">
                  ${i.price.toLocaleString()}
                </Card.Text>
                <div className="mt-auto">
<Link to={`/items/${i.id}`}>
                  <Button variant="primary">
                    Ver
                  </Button>
                  </Link>          
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
