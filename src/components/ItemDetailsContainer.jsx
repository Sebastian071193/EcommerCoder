import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container } from "react-bootstrap";

import data from "../data/productos.json";

export const ItemDetailsContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    new Promise((resolve) => setTimeout(() => resolve(data), 2000))
      .then((response) => {
        const finded = response.find((i) => i.id === Number(id));
        setItems(finded);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return "wait";

  return (
    <Container className="mt-4">
      <h1>{items.title}</h1>
      <h2>{items.category}</h2>
      <h3>{items.description}</h3>
      <img src={items.imageUrl} height={300} /> <br />
       <b>${items.price}</b>
    </Container>
  );
};