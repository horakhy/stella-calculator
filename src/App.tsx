import { Container, useColorMode } from "@chakra-ui/react";
import "./App.css";
import { HomePage } from "./assets/pages/home";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Container maxWidth="100%" height="800px">
        <Navbar />
        <HomePage />
      </Container>
    </>
  );
}

export default App;
