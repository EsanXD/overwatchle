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
  Flex,
} from "@chakra-ui/react";
import { Character, DailyWord } from "../util/interfaces";
import { styles } from "../util/consts";
import { gradeGuess } from "../util/scoreboardUtil";
import { DateTime } from "luxon";

export const ScoreModal = ({
  guesses,
  actual,
  onClose,
  isLargeSize,
}: {
  guesses: Character[];
  actual: Character;
  onClose: () => void;
  isLargeSize: boolean;
}) => {
  const reversedList = guesses.slice().reverse();
  const buildEmojiRow = (gradedGuess: (boolean | undefined)[]) => {
    return gradedGuess.map((grade, ind) => {
      const wrong = "🟥";
      const correct = "🟩";
      const partial = "🟨";
      if (ind === 0) return "";
      return typeof grade === "undefined" ? partial : grade ? correct : wrong;
    });
  };

  const shareStringBuilder = () => {
    return `Overwatchle: ${DateTime.now().toFormat("MM/dd")}\n\n${guesses.map(
      (guess, index) => {
        const gradedGuess = gradeGuess(guess, actual);
        return buildEmojiRow(gradedGuess) + "\n";
      }
    )}`
      .replaceAll(",", "")
      .replaceAll(",", "");
  };
  const shareString = shareStringBuilder();
  return (
    <>
      <Modal isOpen={true} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent bg={"#43484c"}>
          <ModalHeader
            textAlign={"center"}
            style={styles.font}
            as="em"
            fontSize={24}
            color={"white"}
          >
            CORRECT HERO<br></br> {actual.name.toUpperCase()}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight={"50vh"}>
            <Flex
              flex={1}
              flexDir={"column"}
              alignItems={"center"}
              maxHeight={"30vh"}
              overflowY={"auto"}
            >
              {guesses.map((guess, index) => {
                const gradedGuess = gradeGuess(guess, actual);
                return (
                  <Text fontSize={isLargeSize ? 32 : 16}>
                    {buildEmojiRow(gradedGuess)}
                  </Text>
                );
              })}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"white"}
              color={"orange"}
              mr={3}
              onClick={() => {
                navigator.clipboard.writeText(shareString);
              }}
            >
              <Text style={styles.font}>SHARE</Text>
            </Button>
            <Button bg={"#f99e1a"} color={"white"} mr={3} onClick={onClose}>
              <Text style={styles.font}>YIPPEEEE</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
