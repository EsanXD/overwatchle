import { Flex, useBreakpointValue } from "@chakra-ui/react";
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
  const isLargeSize = useBreakpointValue({ base: false, md: false, lg: true });

  return (
    <Flex
      flexDirection={"row"}
      gap={isLargeSize ? 4 : 0}
      wrap={"wrap"}
      height={"auto"}
      justifyContent={"center"}
      alignItems={"center"}
      flexGrow={1}
      px={4}
    >
      <HeroPool
        isDisabled={isDisabled}
        isLargeSize={isLargeSize}
        selected={selected}
        setCharacterGuess={setCharacterGuess}
        numCols={6}
        type={"tank"}
      />
      <HeroPool
        isDisabled={isDisabled}
        isLargeSize={isLargeSize}
        selected={selected}
        setCharacterGuess={setCharacterGuess}
        numCols={9}
        type={"dps"}
      />
      <HeroPool
        isDisabled={isDisabled}
        isLargeSize={isLargeSize}
        selected={selected}
        setCharacterGuess={setCharacterGuess}
        numCols={5}
        type={"support"}
      />
    </Flex>
  );
};
