import { FormIncidente } from "./Components/FormIncidente";
import { Container, Row, Col, Navbar } from "react-materialize"
import { RenderIncidentes } from "./Components/RenderIncidentes";
import { useState } from "react";

function App() {

  //Se utiliza para manejar el estado de saber si es que hicimos un post de un incidente y poder actualizar nuestra lista de incidentes con un nuevo fetch
  const [agregarIncidente, setAgregarIncidente] = useState(false)
  return (
    <>
      <Navbar
        brand={<h6>Shelter Alerts</h6>}
        centerLogo
        blue
      >
      </Navbar>
      <Container>
        <Row>
          <Col s={3}>
            {/* Hace el post de un incidente */}
            <FormIncidente cambiarEstado={setAgregarIncidente} />
          </Col>
          <Col s={6}>
            {/* Renderiza los todos los incidentes */}
            <RenderIncidentes agregarIncidente={agregarIncidente} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;