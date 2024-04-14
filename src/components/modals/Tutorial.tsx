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
    const texts = [
      "WELCOME TO OVERWATCHLE! THIS IS A GAME WHERE YOU GUESS THE RANDOM HERO OF THE DAY",
      "YOU WILL SELECT A CHARCTER ON THE BOTTOM OF THE SCREEN, THEN CLICK SUBMIT",
      "FOR EVERY CORRECT ATRIBUTE OF THE HERO YOU GUESSED, YOU WILL GET HINTS ON THE SCREEN.",
      "IF A ATRIBUTE IS GREEN, IT MEANS YOU GOT IT RIGHT! IF YOU GET IT WRONG, IT WILL BE RED.",
      "IF THE ATRIBUTE IS ORANGE IT MEANS YOU ARE PARTIALLY CORRECT.",
    ];
    switch (page < texts.length) {
      case true:
        return texts[page];
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
