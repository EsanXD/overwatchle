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
  Spacer,
  Heading,
} from "@chakra-ui/react";
import { styles } from "../util/consts";

export const TutorialModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <Modal isOpen={true} onClose={onClose} isCentered={true} size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#43484c"}>
          <ModalHeader fontSize={40} style={styles.font} color={"#f99e1a"}>
            HOW TO PLAY
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading style={styles.font} color={"#f99e1a"}>
              HARD MODE:
            </Heading>
            <Text style={styles.font} color={"#218ffe"}>
              CLICK ON THE HERO AND TYPE IN THE NAME OF THE ABILITY.
            </Text>
            <Spacer />
            <Heading style={styles.font} color={"#f99e1a"}>
              EASY MODE:
            </Heading>
            <Text style={styles.font} color={"#218ffe"}>
              CLICK ON THE HERO FIRST, THEN USE THE DROPDOWN TO SELECT THE
              ABILITY
            </Text>
            <Spacer />
            <Heading style={styles.font} color={"#f99e1a"}>
              SCORING DAILY:
            </Heading>
            <Text style={styles.font} color={"#218ffe"}>
              WHEN YOU SELECT THE CORRECT CHARACTER YOU GAIN 1 POINT. WHEN YOU
              SELECT THE CORRECT ABILITY YOU GAIN 2 POINTS.
            </Text>
            <Heading style={styles.font} color={"#f99e1a"}>
              SCORING ENDLESS:
            </Heading>
            <Text style={styles.font} color={"#218ffe"}>
              WHEN YOU SELECT THE INCORRECT CHARACTER YOU USE 2 LIVES. WHEN YOU
              SELECT THE INCORRECT ABILITY YOU USE 1 LIFE.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button bg={"#f99e1a"} color={"white"} mr={3} onClick={onClose}>
              <Text style={styles.font}>YIPPEE</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
