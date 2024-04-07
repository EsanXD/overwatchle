import {
  Flex,
  Input,
  Image,
  Heading,
  Spacer,
  Button,
  Text,
  Skeleton,
  Switch,
  Select,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { abilities, styles } from "../util/consts";
import { HeroSelect } from "./HeroSelect";
import { useState } from "react";
import { DailyWord } from "../util/interfaces";
import { ScoreModal } from "../modals/Score";
import { EndlessModal } from "../modals/Endless";
import { TutorialModal } from "../modals/Tutorial";

const ModalStates = {
  TUTORIAL: "tutorial",
  SHOW_SCORE: "showScore",
  GAME_OVER: "gameOver",
};

export const App = ({
  data,
  endless,
}: {
  data: DailyWord[];
  endless: boolean;
}) => {
  const [modalActive, setModalActive] = useState<any>(ModalStates.TUTORIAL);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedCharcter, setCharacter] = useState("");
  const [ability, setAbility] = useState("");
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [easyMode, setEasyMode] = useState(false);
  const [endlessData, setEndlessData] = useState<DailyWord>(
    abilities[Math.floor((Math.random() * 100000) % abilities.length)]
  );
  const [previousData, setPreviousData] = useState<DailyWord>(endlessData);
  const [strikes, setStrikes] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>
  ) => setAbility(event.currentTarget.value);

  const setCharacterGuess = (character: string) => {
    setCharacter(character);
  };

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
    >
      <Flex p={4} gap={1} alignSelf={"end"} alignItems={"center"}>
        <Text style={styles.font}>EASY MODE</Text>
        <Switch
          colorScheme="orange"
          onChange={(event) => setEasyMode(event.target.checked)}
        ></Switch>
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
      {endless ? (
        <>
          <Heading style={styles.font}>STAGE {turn + 1}</Heading>
          <Flex>{getStrikeIcons()}</Flex>
          <Image loading="lazy" width={"20vw"} src={endlessData.img} />
        </>
      ) : (
        <>
          {turn === 3 && (
            <>
              <Heading style={styles.font}>GAME OVER</Heading>
              <Heading style={styles.font}>SCORE: {score}</Heading>
              <Flex flexDirection={"row"} gap={4}>
                {data.map((turn, index) => (
                  <Flex flexDirection={"column"} alignItems={"center"}>
                    <Image loading="lazy" width={"20vw"} src={turn.img} />
                    <Text style={styles.font} textAlign={"left"}>
                      {turn.hero.toUpperCase()}: {turn.ability.toUpperCase()}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </>
          )}

          {turn < 3 && (
            <>
              <Heading style={styles.font}>STAGE {turn + 1}</Heading>
              {data.length > 0 ? (
                <Image loading="lazy" width={"20vw"} src={data[turn].img} />
              ) : (
                <Skeleton height="20px" />
              )}
            </>
          )}
        </>
      )}
      <Spacer />
      {easyMode ? (
        <Select
          disabled={selectedCharcter === "" || (turn === 3 && !endless)}
          maxWidth={"50vw"}
          value={ability}
          onChange={handleChange}
          style={styles.font}
          bg={"rgb(229, 235, 244)"}
        >
          {abilities
            .filter(
              (hero) =>
                sanitizeText(hero.hero.toUpperCase()) ===
                sanitizeText(selectedCharcter.toUpperCase())
            )
            .map((hero) => (
              <option value={hero.ability}>{hero.ability.toUpperCase()}</option>
            ))}
        </Select>
      ) : (
        <Input
          isDisabled={turn === 3 && !endless}
          maxWidth={"50vw"}
          value={ability}
          onChange={handleChange}
          style={styles.font}
          placeholder="GUESS THE ABILITY"
        />
      )}
      <Flex
        direction={"row"}
        wrap={"wrap"}
        gap={50}
        justifyContent={"center"}
        alignItems={"center"}
        flexGrow={1}
      >
        <HeroSelect
          isDisabled={turn === 3 && !endless}
          selected={selectedCharcter}
          setCharacterGuess={setCharacterGuess}
        />
      </Flex>
      <Button
        style={{ ...styles.primary, ...styles.font }}
        onClick={endless ? handleSubmitEndless : handleSubmit}
        my={4}
      >
        SUBMIT GUESS
      </Button>
    </Flex>
  );
};
