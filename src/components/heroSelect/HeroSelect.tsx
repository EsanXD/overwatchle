import { Flex, IconButton, useBreakpointValue, Image } from "@chakra-ui/react";
import { HeroPool } from "./HeroPool";
import { useState } from "react";
import { Character } from "../util/interfaces";

export const HeroSelect = ({
  selected,
  setCharacterGuess,
  isDisabled,
  isLargeSize,
  guesses,
}: {
  selected: string;
  setCharacterGuess: any;
  isDisabled: boolean;
  isLargeSize: boolean;
  guesses: Character[];
}) => {
  const [filter, setFilter] = useState("tank");
  const typeIcons = [
    "/Circle_Tank.svg",
    "/Circle_Damage.svg",
    "/Circle_Support.svg",
  ];
  const numRows: Record<string, number> = { tank: 6, dps: 9, support: 6 };

  return (
    <>
      {isLargeSize ? (
        <Flex
          flexDirection={"row"}
          gap={isLargeSize ? 4 : 0}
          wrap={"wrap"}
          height={"auto"}
          justifyContent={"center"}
          alignItems={"center"}
          flexGrow={1}
          px={4}
          py={8}
        >
          <HeroPool
            guesses={guesses}
            isDisabled={isDisabled}
            isLargeSize={isLargeSize}
            selected={selected}
            setCharacterGuess={setCharacterGuess}
            numCols={6}
            type={"tank"}
          />
          <HeroPool
            guesses={guesses}
            isDisabled={isDisabled}
            isLargeSize={isLargeSize}
            selected={selected}
            setCharacterGuess={setCharacterGuess}
            numCols={9}
            type={"dps"}
          />
          <HeroPool
            guesses={guesses}
            isDisabled={isDisabled}
            isLargeSize={isLargeSize}
            selected={selected}
            setCharacterGuess={setCharacterGuess}
            numCols={6}
            type={"support"}
          />
        </Flex>
      ) : (
        <Flex flexDir={"column"} gap={8}>
          <Flex justifyContent={"center"} gap={4}>
            {typeIcons.map((icon, idx) => (
              <IconButton
                key={idx}
                aria-label="iconFilter"
                onClick={() => setFilter(["tank", "dps", "support"][idx])}
                borderRadius={"full"}
                border={"4px solid white"}
                height={45}
                width={45}
                bgColor={
                  filter === ["tank", "dps", "support"][idx]
                    ? "orange"
                    : "transparent"
                }
              >
                <Image src={process.env.PUBLIC_URL + icon} />
              </IconButton>
            ))}
          </Flex>

          <HeroPool
            guesses={guesses}
            isDisabled={isDisabled}
            isLargeSize={isLargeSize}
            selected={selected}
            setCharacterGuess={setCharacterGuess}
            numCols={numRows[filter]}
            type={filter}
          />
        </Flex>
      )}
    </>
  );
};
