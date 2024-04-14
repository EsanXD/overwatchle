import {
  Flex,
  Image,
  Heading,
  Button,
  IconButton,
  Card,
  CardBody,
  useToast,
  useMediaQuery,
  Text,
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
import { DateTime } from "luxon";

const ModalStates = {
  TUTORIAL: "tutorial",
  SHOW_SCORE: "showScore",
  GAME_OVER: "gameOver",
};

export const App = ({
  data,
  endless,
  back,
  firstTime,
}: {
  data: DailyWord[];
  endless: boolean;
  back: any;
  firstTime: boolean;
}) => {
  const orange = "#FFA301";
  const grey = "#40475B";
  const darkGrey = "#272C3A";
  const blue = "#218ffe";
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<any>(
    firstTime ? ModalStates.TUTORIAL : ""
  );
  const [selectedCharcter, setCharacter] = useState("");
  const [guesses, setGuesses] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character>();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const toast = useToast();

  const [isLargeSize] = useMediaQuery("(min-width: 1530px)");

  const sanitizeText = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
  };

  const getCharacter = (name: string): Character => {
    return Characters.find((c) => sanitizeText(c.name) === sanitizeText(name))!;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerActive) setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timerActive]);

  const actual = getCharacter(data.length ? data[0].hero : "");

  const handleSubmit = () => {
    if (gameOver) return;
    if (currentCharacter) {
      setTimerActive(true);
      setGuesses([...guesses, currentCharacter]);
      setCharacter("");
    } else {
      toast({
        title: "Please Select a Character",
        description: "No character has been selected",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (currentCharacter === actual) {
      setTimerActive(false);
      setCharacter(currentCharacter.name);
      setGameOver(true);
    }
  };

  const formatTimer = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours > 0 ? hours + ":" : ""}${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    setCurrentCharacter(getCharacter(selectedCharcter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharcter]);

  useEffect(() => {
    if (seconds === 0) return;
    const date = DateTime.now().toFormat("dd/MM/yyyy");
    localStorage.setItem("visited", "true");
    localStorage.setItem(date, JSON.stringify({ guesses, gameOver, seconds }));
  }, [gameOver, guesses, seconds]);

  useEffect(() => {
    const date = DateTime.now().toFormat("dd/MM/yyyy");
    const storedData = localStorage.getItem(date);
    if (storedData) {
      const data = JSON.parse(storedData);
      setGuesses(data.guesses);
      setGameOver(data.gameOver);
      setSeconds(data.seconds);
      if (data.gameOver) setTimerActive(false);
      else setTimerActive(true);
    }
  }, []);

  return (
    <Flex
      bg={"rgba(229, 235, 244, .8)"}
      flexGrow={1}
      direction="column"
      alignItems="center"
      justifyContent="space-around"
      gap={2}
      width={"100vw"}
      overflow={"hidden"}
    >
      <IconButton
        position={"absolute"}
        left={4}
        top={"10vh"}
        aria-label="settings"
        bgColor={orange}
        onClick={() => setSettingsOpen(true)}
        zIndex={2}
        icon={<HamburgerIcon />}
      />
      <Flex
        gap={4}
        flexDir={isLargeSize ? "row" : "column"}
        alignItems={isLargeSize ? "" : "center"}
      >
        {data.length ? (
          <Scoreboard
            isLargeSize={isLargeSize}
            guesses={guesses}
            actual={getCharacter(data[0].hero)}
          />
        ) : (
          <></>
        )}
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
                {currentCharacter?.name ?? "CHARACTER"}
              </Heading>
              <Button onClick={handleSubmit} style={styles.font} as={"em"}>
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
          isLargeSize={isLargeSize}
          isDisabled={gameOver}
          selected={selectedCharcter}
          guesses={guesses}
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
