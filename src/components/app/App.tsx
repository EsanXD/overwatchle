import { Flex, IconButton, useToast, useMediaQuery } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { HeroSelect } from "../heroSelect/HeroSelect";
import { useCallback, useEffect, useState } from "react";
import { Character } from "../util/interfaces";
import { TutorialModal } from "../modals/Tutorial";
import { Settings } from "../menu/Settings";
import { Scoreboard } from "../scoreboard.tsx/Scoreboard";
import { Characters } from "../util/characters";
import { DateTime } from "luxon";
import { ScoreModal } from "../modals/Score";
import { Submit } from "../scoreboard.tsx/Submit";

export const ModalStates = {
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
  data: Character;
  endless: boolean;
  back: () => void;
  firstTime: boolean;
}) => {
  const orange = "#FFA301";
  const actual = data;
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
  const [firstLoad, setFirstLoad] = useState(true);

  const sanitizeText = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
  };
  const getCharacter = useCallback((name: string): Character => {
    return Characters.find((c) => sanitizeText(c.name) === sanitizeText(name))!;
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timerActive) setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timerActive]);

  const handleSubmit = useCallback(() => {
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
    if (currentCharacter?.name.toUpperCase() === actual?.name.toUpperCase()) {
      setTimerActive(false);
      setCharacter(currentCharacter.name);
      setModalActive(ModalStates.SHOW_SCORE);
      setGameOver(true);
    }
  }, [actual, currentCharacter, gameOver, guesses, toast]);

  useEffect(() => {
    setCurrentCharacter(getCharacter(selectedCharcter));
  }, [getCharacter, selectedCharcter]);

  useEffect(() => {
    if (seconds === 0) return;
    const date = DateTime.now().toFormat("dd/MM/yyyy");
    localStorage.setItem("visited", "true");
    localStorage.setItem(date, JSON.stringify({ guesses, gameOver, seconds }));
  }, [gameOver, guesses, seconds]);

  useEffect(() => {
    const date = DateTime.now().toFormat("dd/MM/yyyy");
    const storedData = localStorage.getItem(date);
    if (storedData && firstLoad) {
      setFirstLoad(false);
      const data = JSON.parse(storedData);
      setGuesses(data.guesses);
      setGameOver(data.gameOver);
      setSeconds(data.seconds);
      if (data.gameOver) {
        setTimerActive(false);
        setModalActive(ModalStates.SHOW_SCORE);
      } else setTimerActive(true);
    }
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleSubmit, seconds, firstLoad]);

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
        <Scoreboard
          isLargeSize={isLargeSize}
          guesses={guesses}
          actual={actual}
        />
        <Submit
          isLargeSize={isLargeSize}
          seconds={seconds}
          gameOver={gameOver}
          currentCharacter={currentCharacter}
          handleSubmit={handleSubmit}
          setModalActive={setModalActive}
        />
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
      {modalActive === ModalStates.SHOW_SCORE && (
        <ScoreModal
          guesses={guesses}
          actual={actual}
          isLargeSize={isLargeSize}
          onClose={() => setModalActive(undefined)}
        />
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
