import { Flex } from "@chakra-ui/react";
import { HeroPool } from "./HeroPool";

export const HeroSelect = ({
  selected,
  setCharacterGuess,
  isDisabled,
}: {
  selected: string;
  setCharacterGuess: any;
  isDisabled: boolean;
}) => {
  return (
    <Flex
      flexDirection={"row"}
      gap={4}
      wrap={"wrap"}
      height={"auto"}
      justifyContent={"center"}
      alignItems={"center"}
      flexGrow={1}
      px={4}
    >
      <HeroPool
        isDisabled={isDisabled}
        selected={selected}
        setCharacterGuess={setCharacterGuess}
        numCols={6}
        type={"tank"}
      />
      <HeroPool
        isDisabled={isDisabled}
        selected={selected}
        setCharacterGuess={setCharacterGuess}
        numCols={9}
        type={"dps"}
      />
      <HeroPool
        isDisabled={isDisabled}
        selected={selected}
        setCharacterGuess={setCharacterGuess}
        numCols={5}
        type={"support"}
      />
    </Flex>
  );
};
