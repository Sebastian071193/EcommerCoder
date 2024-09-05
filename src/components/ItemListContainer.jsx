import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const ref = !id
      ? collection(db, "items")
      : query(collection(db, "items"), where("categoryId", "==", id));

    getDocs(ref)
      .then((snapshot) => {
        setItems(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      ></Container>
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
                  src={i.imageId}
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
                <Card.Text className="text-muted">{i.categoryId}</Card.Text>
                <Card.Text className="fw-bold text-primary">
                  ${i.price.toLocaleString()}
                </Card.Text>

                <div className="mt-auto">
                  <Link to={`/item/${i.id}`}>
                    <Button variant="primary">Ver</Button>
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
