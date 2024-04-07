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
import { DailyWord } from "../util/interfaces";
import { styles } from "../util/consts";

export const ScoreModal = ({
  data,
  score,
  endless,
  onClose,
}: {
  data: DailyWord;
  score: number;
  endless: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal isOpen={true} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent bg={"#43484c"}>
          <ModalHeader style={styles.font} color={"#f99e1a"}>
            NEXT ROUND!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!endless && (
              <Text style={styles.font} color={"#218ffe"}>
                SCORE: {score}
              </Text>
            )}
            <Text style={styles.font} color={"#218ffe"}>
              CORRECT ABILITY: {data.ability.toUpperCase()}
            </Text>
            <Text style={styles.font} color={"#218ffe"}>
              CORRECT HERO: {data.hero.toUpperCase()}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button bg={"#f99e1a"} color={"white"} mr={3} onClick={onClose}>
              <Text style={styles.font}>YIPPEEEE</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};