import {
  Button,
  Flex,
  useColorMode,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useToast,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Logo from "../images/stella-logo.svg";
import { useEffect, useState } from "react";

interface InvestimentForm {
  initialInvestiment: number | undefined;
  interestRate: number | undefined;
  months: number | undefined;
}

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toast = useToast();
  const [form, setForm] = useState<InvestimentForm>({
    initialInvestiment: undefined,
    interestRate: undefined,
    months: undefined,
  });
  const [result, setResult] = useState<number | undefined>(undefined);

  // Verify if the form is valid
  const isFormInvalid = () => {
    if (
      Object.values(form).some(
        (value) => value === undefined || value === 0 || isNaN(value)
      )
    ) {
      return true;
    }

    return false;
  };

  const handleCalculate = () => {
    // calculate the final value
    const finalValue =
      form.initialInvestiment! * (1 + form.interestRate! / 100) ** form.months!;

    setResult(finalValue);
  };

  const handleReset = () => {
    setForm({
      initialInvestiment: undefined,
      interestRate: undefined,
      months: undefined,
    });
    setResult(undefined);
  };

  const handleToastError = () => {
    toast({
      title: "Formulário inválido",
      description: "Preencha todos os campos corretamente",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleToastSuccess = () => {
    if (!result) {
      handleToastError();
      return;
    }

    toast({
      title: "Resultado",
      description: `O valor final do investimento é de R$ ${result.toFixed(2)}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (result) {
      handleToastSuccess();
      setResult(undefined);
    }
  }, [result]);

  return (
    <>
      <Flex
        width="100vw"
        pt={3}
        pb={3}
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        bgColor={colorMode === "light" ? "white" : "#1a202c"}
        as="nav"
        borderBottom={
          colorMode === "light" ? "1px solid #e2e8f0" : "1px solid #e2e8f0"
        }
      >
        <Flex alignItems="center" justifyContent="center">
          <Image pl={2} src={Logo} alt="Logo" />
          <Text pt={2} pl={2} pr={4} fontSize={26} fontWeight={800}>
            Stella
          </Text>
          <Button scale={2} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>

        <Flex mr={8} alignItems="center" justifyContent="center" gap={2}>
          <Button
            onClick={() => setOpenModal(true)}
            pt={2}
            fontSize={14}
            fontWeight={800}
          >
            Calcular Investimento
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Calcular investimento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={isFormInvalid()} isRequired>
              <FormLabel>Valor do investimento</FormLabel>
              <Input
                type="number"
                placeholder="R$ 0,00"
                value={form.initialInvestiment}
                onChange={(e) =>
                  setForm({
                    ...form,
                    initialInvestiment: e.target.valueAsNumber,
                  })
                }
              />
              <FormLabel>Quantidade de meses</FormLabel>
              <Input
                type="number"
                value={form.months}
                onChange={(e) =>
                  setForm({ ...form, months: e.target.valueAsNumber })
                }
              />
              <FormLabel>Taxa ao mês</FormLabel>
              <Input
                type="number"
                value={form.interestRate}
                onChange={(e) =>
                  setForm({ ...form, interestRate: e.target.valueAsNumber })
                }
              />
              {isFormInvalid() ? (
                <FormHelperText>Preencha todos os dados</FormHelperText>
              ) : (
                <FormErrorMessage>Esse campo é obrigatório.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={handleCalculate}
              disabled={isFormInvalid()}
            >
              Calcular
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
