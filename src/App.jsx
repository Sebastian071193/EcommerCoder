import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailsContainer } from "./components/ItemDetailsContainer";
import { Cart } from "./components/Cart";
import { Provider } from "./cont/ItemContext"; // Importa el Provider

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailsContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h1>404: Página no encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
