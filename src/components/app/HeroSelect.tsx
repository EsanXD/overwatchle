import { Flex } from "@chakra-ui/react";
import { HeroPool } from "./HeroPool";

export const HeroSelect = ({
  selected,
  setCharacterGuess,
}: {
  selected: string;
  setCharacterGuess: any;
}) => {
  return (
    <Flex
      flexDirection={"row"}
      gap={4}
      wrap={"wrap"}
      height={"auto"}
      justifyContent={"center"}
      flexGrow={1}
    >
      <HeroPool
        selected={selected}
        setCharacterGuess={setCharacterGuess}
        numCols={6}
        type={"tank"}
      />
      <HeroPool
        selected={selected}
        setCharacterGuess={setCharacterGuess}
        numCols={9}
        type={"dps"}
      />
      <HeroPool
        selected={selected}
        setCharacterGuess={setCharacterGuess}
        numCols={5}
        type={"support"}
      />
    </Flex>
  );
};
