import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { dailyWord } from "../util/interfaces";

export const ScoreModal = ({
  data,
  turn,
  score,
  onClose,
}: {
  data: dailyWord[];
  turn: number;
  score: number;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Score: {score}</p>
            <p>Correct Ability: {data[turn].ability}</p>
            <p>Correct Hero: {data[turn].hero}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={onClose}>
              Yippee
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
