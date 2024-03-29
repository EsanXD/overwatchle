import { Box, Flex, Input, Image, Heading } from "@chakra-ui/react";
import { abilities } from "./consts";
import { tank, dps, support } from "./characters";
import { HeroSelect } from "./HeroSelect";
import { useState } from "react";

export const App = () => {
  const [selectedCharcter, setCharacter] = useState("");
  const [ability, setAbility] = useState("");
  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    setAbility(event.currentTarget.value);

  const setCharacterGuess = (character: string) => {
    setCharacter(character);
  };

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
      <Image loading="lazy" src={abilities[0].img} />
      {ability}
      {selectedCharcter}
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
    </Flex>
  );
};
