import {
  Flex,
  Input,
  Image,
  Heading,
  Button,
  Text,
  Select,
  IconButton,
  Box,
  Card,
  CardBody,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { styles } from "../util/consts";
import { HeroSelect } from "../heroSelect/HeroSelect";
import { useEffect, useState } from "react";
import { Character, DailyWord } from "../util/interfaces";
import { TutorialModal } from "../modals/Tutorial";
import { Settings } from "../menu/Settings";
import { Scoreboard } from "../scoreboard.tsx/Scoreboard";
import { Characters } from "../util/characters";

const ModalStates = {
  TUTORIAL: "tutorial",
  SHOW_SCORE: "showScore",
  GAME_OVER: "gameOver",
};

export const App = ({
  data,
  endless,
  back,
}: {
  data: DailyWord[];
  endless: boolean;
  back: any;
}) => {
  const orange = "#FFA301";
  const grey = "#2D4248";
  const blue = "#218ffe";
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<any>(ModalStates.TUTORIAL);
  const [selectedCharcter, setCharacter] = useState("");
  const [guesses, setGuesses] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character>();
  const toast = useToast();

  const [isLargerThan1360] = useMediaQuery("(min-width: 1364px)");

  const sanitizeText = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
  };

  const getCharacter = (name: string): Character => {
    return Characters.find((c) => sanitizeText(c.name) === sanitizeText(name))!;
  };

  const handleSubmit = () => {
    if (currentCharacter) {
      setGuesses([...guesses, currentCharacter]);
    } else {
      toast({
        title: "Please Select a Character",
        description: "No character has been selected",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setCurrentCharacter(getCharacter(selectedCharcter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharcter]);

  return (
    <Flex
      bg={"rgba(229, 235, 244, .8)"}
      flexGrow={1}
      direction="column"
      align="center"
      justify="space-around"
      gap={2}
      width={"100vw"}
      overflow={"hidden"}
    >
      <IconButton
        position={"absolute"}
        left={4}
        top={128}
        aria-label="settings"
        bgColor={orange}
        onClick={() => setSettingsOpen(true)}
        icon={<HamburgerIcon />}
      />

      <Flex
        gap={4}
        flexDir={isLargerThan1360 ? "row" : "column"}
        alignItems={isLargerThan1360 ? "" : "center"}
      >
        {data.length ? (
          <Scoreboard guesses={guesses} actual={getCharacter(data[0].hero)} />
        ) : (
          <></>
        )}
        <Card zIndex={1} maxHeight={300} w={isLargerThan1360 ? 350 : "50vw"}>
          <CardBody p={0} w={isLargerThan1360 ? 350 : "50vw"}>
            <Flex bgColor={grey}>
              <Image
                height={isLargerThan1360 ? 150 : 75}
                src={
                  currentCharacter?.img ??
                  "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt451e9e607acad0dc/64a72e2c9d480a8704791cbd/Dive_Into_Enemy_Lines.png?format=webply&quality=90"
                }
                alt="selected character image"
                borderRadius="lg"
              />
              <Flex
                height={isLargerThan1360 ? 150 : 75}
                justifyContent={"center"}
                alignItems={"center"}
                flex={1}
              >
                Timer
              </Flex>
            </Flex>
            <Flex
              direction={"column"}
              p={4}
              gap={4}
              bgColor={"rgba(45, 66, 72, .8)"}
            >
              <Heading as="em" style={styles.font} color={blue}>
                {currentCharacter?.name ?? "CHARACTER"}
              </Heading>
              <Button onClick={handleSubmit}>
                {currentCharacter ? "GUESS" : "SELECT"}
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Flex>

      <Flex
        direction={"row"}
        wrap={"wrap"}
        gap={50}
        justifyContent={"center"}
        alignItems={"center"}
        pb={8}
      >
        <HeroSelect
          isDisabled={false}
          selected={selectedCharcter}
          setCharacterGuess={(character: string) => {
            setCharacter(character);
          }}
        />
      </Flex>

      {modalActive === ModalStates.TUTORIAL && (
        <TutorialModal onClose={() => setModalActive(undefined)} />
      )}
      {settingsOpen && (
        <Settings
          onClose={() => setSettingsOpen(false)}
          openMenu={back}
          openTutorial={() => setModalActive(ModalStates.TUTORIAL)}
        />
      )}
    </Flex>
  );
};
