import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Pagina principal</h1>
      <h2>Bienvenido a la pagina principal</h2>
      <button onClick={(()=> navigate ("/forms"))}>hola</button>
    </>
  );
}

export default App;
