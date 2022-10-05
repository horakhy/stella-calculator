import { Container, Image, Text } from "@chakra-ui/react";
import CalculatorImage from "../../images/calculator.svg";

export const HomePage = () => {
  return (
    <Container display="flex" as="main" maxWidth="100%" pt={100} height="800px">
      <Image padding={5} bgColor="darkgray" boxSize="500px" src={CalculatorImage} alt="Calculator" />
      <Text textAlign="center" fontSize="80px">Calcule o retorno financeiro de seu investimento</Text>
    </Container>
  );
};
