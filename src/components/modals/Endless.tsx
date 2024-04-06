import {
  Modal,
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

export const EndlessModal = ({
  turn,
  onClose,
}: {
  turn: number;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal isOpen={true} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent bg={"#43484c"}>
          <ModalHeader style={styles.font} color={"#f99e1a"}>
            YOU LOSE!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text style={styles.font} color={"#218ffe"}>
              YOU MADE IT TO TURN {turn}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button bg={"#f99e1a"} color={"white"} mr={3} onClick={onClose}>
              <Text style={styles.font}>WOMP WOMP</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
