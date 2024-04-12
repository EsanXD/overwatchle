import {
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { styles } from "../util/consts";
import { useState } from "react";

export const TutorialModal = ({ onClose }: { onClose: () => void }) => {
  const [page, setPage] = useState(0);

  const getPage = () => {
    switch (page) {
      case 0:
        return "WELCOME TO OVERWATCHLE! THIS IS A GAME WHERE YOU GUESS THE ABILITY OF A RANDOM OVERWATCH HERO.";
      case 1:
        return "YOU WILL BE PRESENTED WITH A RANDOM ABILITY AND YOU MUST GUESS THE NAME OF THAT ABILITY.";
      case 2:
        return "YOU CAN SELECT THE HERO FIRST THEN TYPE IN THE ABILITY NAME OR SELECT THE HERO AND ABILITY FROM A DROPDOWN.";
      case 3:
        return "YOU WILL GAIN POINTS FOR SELECTING THE CORRECT HERO AND ABILITY.";
      case 4:
        return "IF YOU ARE PLAYING ENDLESS YOU WILL LOSE LIVES FOR SELECTING THE INCORRECT HERO AND ABILITY.";
      case 5:
        return "THAT'S IT! HAVE FUN PLAYING!";
      default:
        return "THAT'S IT! HAVE FUN PLAYING!";
    }
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose} isCentered={true} size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#43484c"}>
          <ModalHeader
            as="em"
            fontSize={40}
            style={styles.font}
            color={"#f99e1a"}
          >
            HOW TO PLAY
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height={100}>
              <Text as={"em"} fontSize={20} color={"white"} style={styles.font}>
                {getPage()}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            {page < 5 && (
              <Button bg={"#f99e1a"} color={"white"} mr={3} onClick={onClose}>
                <Text style={styles.font}>CLOSE</Text>
              </Button>
            )}
            {page > 0 && (
              <Button
                bg={"#f99e1a"}
                color={"white"}
                mr={3}
                onClick={() => setPage(page - 1)}
              >
                <Text style={styles.font}>PREV</Text>
              </Button>
            )}
            {page === 5 ? (
              <Button bg={"#f99e1a"} color={"white"} mr={3} onClick={onClose}>
                <Text style={styles.font}>CLOSE</Text>
              </Button>
            ) : (
              <Button
                bg={"#f99e1a"}
                color={"white"}
                mr={3}
                onClick={() => setPage(page + 1)}
              >
                <Text style={styles.font}>NEXT</Text>
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
