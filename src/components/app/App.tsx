import {
  Flex,
  Input,
  Image,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  Stepper,
  Heading,
  Spacer,
  Button,
  Text,
  Skeleton,
  Switch,
  Select,
} from "@chakra-ui/react";
import { abilities, styles } from "../util/consts";
import { HeroSelect } from "./HeroSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import { dailyWord } from "../util/interfaces";
import { ScoreModal } from "../modals/Score";

export const App = ({
  data,
  endless,
}: {
  data: dailyWord[];
  endless: boolean;
}) => {
  const [modalActive, setModalActive] = useState(false);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedCharcter, setCharacter] = useState("");
  const [ability, setAbility] = useState("");
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [easyMode, setEasyMode] = useState(false);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    setAbility(event.currentTarget.value);

  const handleChangeEasy = (event: any) =>
    setAbility(event.currentTarget.value);

  const setCharacterGuess = (character: string) => {
    setCharacter(character);
  };

  const sanitizeText = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
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
    setScore(score + pointsGained);
    setScores([...scores, pointsGained]);
    setAbility("");
    setTurn(turn + 1);
    setGuesses([...guesses, `${selectedCharcter}: ${ability}`]);
    setCharacter("");
    setModalActive(true);
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
      {modalActive && (
        <ScoreModal
          turn={turn - 1}
          data={data}
          onClose={() => {
            setModalActive(false);
          }}
          score={score}
        />
      )}

      {turn === 3 && (
        <>
          <Heading style={styles.font}>SCORE: {score}</Heading>
          <Flex flexDirection={"row"} gap={4}>
            {data.map((turn, index) => (
              <Flex flexDirection={"column"} alignItems={"center"}>
                <Image loading="lazy" width={"20vw"} src={turn.img} />
                <Text style={styles.font} textAlign={"left"}>
                  ACTUAL: {turn.hero.toUpperCase()} -{" "}
                  {turn.ability.toUpperCase()}
                </Text>
              </Flex>
            ))}
          </Flex>
        </>
      )}

      {turn < 3 && (
        <>
          <Heading style={styles.font}>STAGE {turn + 1}</Heading>
          <Stepper index={turn} colorScheme="blue">
            {data.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepIcon boxSize={6} />
                </StepIndicator>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          {data.length > 0 ? (
            <Image loading="lazy" width={"20vw"} src={data[turn].img} />
          ) : (
            <Skeleton height="20px" />
          )}
        </>
      )}
      <Spacer />
      {easyMode ? (
        <Select
          disabled={selectedCharcter === ""}
          maxWidth={"50vw"}
          onChange={handleChangeEasy}
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
          maxWidth={"50vw"}
          value={ability}
          onChange={handleChange}
          placeholder="Guess the ability"
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
          selected={selectedCharcter}
          setCharacterGuess={setCharacterGuess}
        />
      </Flex>
      <Button
        style={{ ...styles.primary, ...styles.font }}
        onClick={handleSubmit}
        my={4}
      >
        SUBMIT GUESS
      </Button>
    </Flex>
  );
};
