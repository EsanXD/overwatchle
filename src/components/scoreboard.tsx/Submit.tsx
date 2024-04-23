import {
  Card,
  CardBody,
  Flex,
  Image,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { Character } from "../util/interfaces";
import { styles } from "../util/consts";
import { ModalStates } from "../app/App";

export const Submit = ({
  isLargeSize,
  seconds,
  gameOver,
  currentCharacter,
  handleSubmit,
  setModalActive,
  endless,
  resetGame,
}: {
  isLargeSize: boolean;
  seconds: number;
  gameOver: boolean;
  currentCharacter?: Character;
  handleSubmit: () => void;
  setModalActive: (modal: string) => void;
  endless: boolean;
  resetGame: () => void;
}) => {
  const formatTimer = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours > 0 ? hours + ":" : ""}${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const grey = "#40475B";
  const darkGrey = "#272C3A";
  const blue = "#218ffe";

  return (
    <Card zIndex={1} maxHeight={262} w={isLargeSize ? 350 : "90vw"}>
      <CardBody p={0} w={"100%"}>
        <Flex bgColor={grey} flex={1}>
          <Image
            height={isLargeSize ? 150 : 75}
            src={
              currentCharacter?.img ??
              "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt451e9e607acad0dc/64a72e2c9d480a8704791cbd/Dive_Into_Enemy_Lines.png?format=webply&quality=90"
            }
            alt="selected character image"
            borderRadius="lg"
          />
          <Flex
            height={isLargeSize ? 150 : 75}
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
          >
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              bgColor={darkGrey}
              borderRadius={8}
              px={4}
            >
              <Text as="em" color={"white"} style={styles.font}>
                {formatTimer(seconds)}
              </Text>
              <Text
                as="em"
                color={"white"}
                fontWeight={"light"}
                fontSize={10}
                style={styles.font}
              >
                {isLargeSize ? "OBJ CONTEST TIME" : "OBJ TIME"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction={"column"} p={4} gap={4} bgColor={darkGrey}>
          <Heading
            fontSize={isLargeSize ? "xl" : "20"}
            as="em"
            style={styles.font}
            color={blue}
          >
            {currentCharacter?.name.toUpperCase() ?? "CHARACTER"}
          </Heading>
          <Button
            disabled={gameOver && endless}
            onClick={
              gameOver
                ? () => !endless && setModalActive(ModalStates.SHOW_SCORE)
                : handleSubmit
            }
            style={styles.font}
            as={"em"}
          >
            {currentCharacter ? "ENTER" : gameOver ? "SHOW SCORE" : "SELECT"}
          </Button>
          {gameOver && endless && (
            <Button onClick={resetGame} style={styles.font} as={"em"}>
              RESET GAME
            </Button>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};
