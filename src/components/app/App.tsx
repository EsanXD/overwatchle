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
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { abilities, styles } from "../util/consts";
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
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<any>(ModalStates.TUTORIAL);
  const [selectedCharcter, setCharacter] = useState("");
  const [guesses, setGuesses] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character>();
  // const;

  const sanitizeText = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
  };

  const getCharacter = (name: string): Character => {
    return Characters.find((c) => sanitizeText(c.name) === sanitizeText(name))!;
  };

  useEffect(() => {
    setCurrentCharacter(getCharacter(selectedCharcter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharcter]);

  const orange = "#FFA301";
  const grey = "#2D4248";

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

      <Flex gap={4}>
        {data ? (
          <Scoreboard guesses={guesses} actual={getCharacter(data[0].hero)} />
        ) : (
          <></>
        )}
        <Card bgColor={grey}>
          <CardBody p={0}>
            <Flex>
              <Image
                height={150}
                src={
                  currentCharacter?.img ??
                  "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt451e9e607acad0dc/64a72e2c9d480a8704791cbd/Dive_Into_Enemy_Lines.png?format=webply&quality=90"
                }
                alt="selected character image"
                borderRadius="lg"
              />
              <Flex direction={"column"} p={4} gap={4}>
                <Heading color={orange}>{currentCharacter?.name}</Heading>
                <Text>{currentCharacter?.name}</Text>
              </Flex>
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
