import {
  Box,
  Flex,
  Input,
  Image,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Heading,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { abilities } from "./consts";
import { HeroSelect } from "./HeroSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import { dailyWord } from "./interfaces";

export const App = () => {
  const [modalActive, setModalActive] = useState(false);
  const [points, setPoints] = useState(0);
  const [data, setData] = useState<dailyWord[]>([]);
  const [selectedCharcter, setCharacter] = useState("");
  const [ability, setAbility] = useState("");
  const [turn, setTurn] = useState(0);
  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    setAbility(event.currentTarget.value);
  const setCharacterGuess = (character: string) => {
    setCharacter(character);
  };

  const sanitizeText = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
  };

  const handleSubmit = () => {
    console.log("submitting");
    if (!selectedCharcter || !ability) return;
    let pointsGained = 0;
    if (sanitizeText(ability) === sanitizeText(data[turn].ability)) {
      pointsGained += 1;
    }
    if (sanitizeText(selectedCharcter) === sanitizeText(data[turn].hero)) {
      pointsGained += 2;
    }
    setPoints(points + pointsGained);
    setAbility("");
    setTurn(turn + 1);
    setModalActive(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://overwatchle-api.fly.dev/daily"
        );
        const resp = JSON.parse(atob(atob(atob(response.data))));
        setData(resp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Flex
      bg={"gray"}
      flexGrow={1}
      direction="column"
      mx="auto"
      align="center"
      justify="space-between"
      gap={8}
      p={8}
    >
      <Spacer />
      <Heading>Stage {turn + 1}</Heading>
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
      <Spacer />
      {data.length > 0 && turn < 3 && (
        <Image loading="lazy" height={"20vh"} src={data[turn].img} />
      )}
      <Spacer />
      <Input
        value={ability}
        onChange={handleChange}
        placeholder="Guess the ability"
      />
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
      <Button onClick={handleSubmit}>Submit Guess</Button>
    </Flex>
  );
};
