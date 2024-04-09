import {
  Flex,
  Input,
  Image,
  Heading,
  Button,
  Text,
  Select,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { abilities, styles } from "../util/consts";
import { HeroSelect } from "./HeroSelect";
import { useEffect, useState } from "react";
import { DailyWord } from "../util/interfaces";
import { ScoreModal } from "../modals/Score";
import { EndlessModal } from "../modals/Endless";
import { TutorialModal } from "../modals/Tutorial";
import { Settings } from "../menu/Settings";

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
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedCharcter, setCharacter] = useState("");
  const [ability, setAbility] = useState("");
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [easyMode, setEasyMode] = useState(true);
  const [endlessData, setEndlessData] = useState<DailyWord>(
    abilities[Math.floor((Math.random() * 100000) % abilities.length)]
  );
  const [previousData, setPreviousData] = useState<DailyWord>(endlessData);
  const [strikes, setStrikes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [availableAbilities, setAvailableAbilities] = useState<DailyWord[]>([]);

  useEffect(() => {
    const available = abilities.filter(
      (hero) =>
        sanitizeText(hero.hero.toUpperCase()) ===
        sanitizeText(selectedCharcter.toUpperCase())
    );
    setAvailableAbilities(available);
    easyMode &&
      setAbility(
        available.length > 0 ? available[0].ability.toUpperCase() : ""
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharcter]);

  const handleChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>
  ) => setAbility(event.currentTarget.value);

  const sanitizeText = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
  };

  const getStrikeIcons = () => {
    let icons = [];
    for (let i = 0; i < 5; i++) {
      icons.push(
        i < strikes ? (
          <CloseIcon color={"red"} />
        ) : (
          <CloseIcon color={"green"} />
        )
      );
    }
    return icons;
  };

  const handleSubmit = () => {
    if (!selectedCharcter || !ability || turn === 3 || data.length === 0)
      return;
    let pointsGained = 0;
    if (sanitizeText(ability) === sanitizeText(data[turn].ability)) {
      pointsGained += 2;
    }
    if (sanitizeText(selectedCharcter) === sanitizeText(data[turn].hero)) {
      pointsGained += 1;
    }
    setPreviousData(data[turn]);
    setScore(score + pointsGained);
    setScores([...scores, pointsGained]);
    setAbility("");
    turn === 2 && setGameOver(true);
    setTurn(turn + 1);
    setGuesses([...guesses, `${selectedCharcter}: ${ability}`]);
    setCharacter("");
    setModalActive(ModalStates.SHOW_SCORE);
  };

  const handleSubmitEndless = () => {
    if (!selectedCharcter || !ability) return;
    let pointsLost = 0;
    if (sanitizeText(ability) !== sanitizeText(endlessData.ability)) {
      pointsLost += 1;
    }
    if (sanitizeText(selectedCharcter) !== sanitizeText(endlessData.hero)) {
      pointsLost += 2;
    }
    setPreviousData(endlessData);
    setEndlessData(
      abilities[Math.floor((Math.random() * 100000) % abilities.length)]
    );
    setAbility("");
    setStrikes(strikes + pointsLost);
    setTurn(turn + 1);
    setCharacter("");
    if (strikes + pointsLost >= 5) {
      setGameOver(true);
      setModalActive(ModalStates.GAME_OVER);
    } else {
      setModalActive(ModalStates.SHOW_SCORE);
    }
  };

  return (
    <Flex
      bg={"rgba(229, 235, 244, .8)"}
      flexGrow={1}
      direction="column"
      align="center"
      justify="space-between"
      gap={2}
      width={"100vw"}
      overflow={"hidden"}
    >
      <Flex justifyContent={"center"} alignItems={"center"}>
        <IconButton
          position={"absolute"}
          left={4}
          aria-label="settings"
          colorScheme="orange"
          onClick={() => setSettingsOpen(true)}
          icon={<HamburgerIcon />}
        />
        <Flex flexDirection={"column"} alignItems={"center"}>
          {gameOver ? (
            <Heading as="em" style={styles.font}>
              GAME OVER
            </Heading>
          ) : (
            <Heading as="em" style={styles.font}>
              STAGE {turn + 1}
            </Heading>
          )}
          <Heading as="em" style={styles.font}>
            SCORE: {score}
          </Heading>
          {endless && <Heading>{getStrikeIcons()}</Heading>}
        </Flex>
      </Flex>
      {(endless || (!endless && turn < 3 && data.length > 0)) && (
        <Image
          loading="lazy"
          width={"30vh"}
          src={endless ? endlessData.img : data[turn].img}
        />
      )}
      {gameOver && !endless && (
        <Flex
          flexDirection={"row"}
          gap={4}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {data.map((turn, index) => (
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"30vw"}
            >
              <Image loading="lazy" width={"20vw"} src={turn.img} />
              <Text style={styles.font} textAlign={"center"}>
                {turn.hero.toUpperCase()}: {turn.ability.toUpperCase()}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}
      <Flex alignItems={"center"} gap={8} width={"85vw"}>
        {easyMode ? (
          <Select
            disabled={selectedCharcter === "" || (turn === 3 && !endless)}
            value={ability}
            onChange={handleChange}
            style={styles.font}
            bg={"rgb(229, 235, 244)"}
          >
            {availableAbilities.map((hero) => (
              <option value={hero.ability}>{hero.ability.toUpperCase()}</option>
            ))}
          </Select>
        ) : (
          <Input
            isDisabled={turn === 3 && !endless}
            value={ability}
            onChange={handleChange}
            style={styles.font}
            placeholder="GUESS THE ABILITY"
          />
        )}
        <Button
          style={{ ...styles.primary, ...styles.font }}
          size={{ base: "sm", sm: "md", md: "lg", lg: "lg" }}
          onClick={endless ? handleSubmitEndless : handleSubmit}
        >
          GUESS
        </Button>
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
          isDisabled={turn === 3 && !endless}
          selected={selectedCharcter}
          setCharacterGuess={(character: string) => {
            setCharacter(character);
          }}
        />
      </Flex>

      {modalActive === ModalStates.SHOW_SCORE && (
        <ScoreModal
          endless={endless}
          data={previousData}
          onClose={() => {
            setModalActive(undefined);
          }}
          score={score}
        />
      )}
      {modalActive === ModalStates.GAME_OVER && (
        <EndlessModal
          turn={turn - 1}
          onClose={() => {
            setGameOver(false);
            setStrikes(0);
            setTurn(0);
            setModalActive(undefined);
          }}
        />
      )}
      {modalActive === ModalStates.TUTORIAL && (
        <TutorialModal onClose={() => setModalActive(undefined)} />
      )}
      {settingsOpen && (
        <Settings
          easyMode={easyMode}
          onClose={() => setSettingsOpen(false)}
          openMenu={back}
          openTutorial={() => setModalActive(ModalStates.TUTORIAL)}
          toggleEasyMode={() => setEasyMode(!easyMode)}
        />
      )}
    </Flex>
  );
};
