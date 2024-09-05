import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export const ItemCount = ({ onAdd, stock }) => {
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    if (count < stock) setCount(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (count > 1) setCount(prev => prev - 1);
  };

  const handleAdd = () => {
    onAdd(count); 
    setCount(1);  
  };

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <ButtonGroup>
        <Button
          variant="secondary"
          onClick={handleDecrease}
          disabled={count <= 1}
        >
          -
        </Button>
        <Button variant="light" className="px-4" disabled>
          {count}
        </Button>
        <Button
          variant="secondary"
          onClick={handleIncrease}
          disabled={count >= stock}
        >
          +
        </Button>
      </ButtonGroup>

      <Button
        variant="primary"
        onClick={handleAdd}
        className="mt-3"
        disabled={stock === 0}
      >
        {stock > 0 ? "Comprar" : "Sin stock"}
      </Button>
    </div>
  );
};
