import {
  Flex,
  Text,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { tank, dps, support } from "../util/characters";
import { styles } from "../util/consts";
import { motion } from "framer-motion";
import { Character } from "../util/interfaces";

export const HeroPool = ({
  selected,
  numCols,
  type,
  setCharacterGuess,
  isDisabled,
  isLargeSize,
  guesses,
  justifyContent,
}: {
  selected: string;
  numCols: number;
  type: string;
  setCharacterGuess: any;
  isDisabled: boolean;
  isLargeSize?: boolean;
  guesses: Character[];
  justifyContent: string;
}) => {
  const characters = type === "support" ? support : type === "dps" ? dps : tank;
  const typeIcon =
    type === "support"
      ? "/Circle_Support.svg"
      : type === "dps"
      ? "/Circle_Damage.svg"
      : "/Circle_Tank.svg";

  const iconButtonVariants = {
    selected: {
      scale: 1.4,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 3,
      },
    },
    notSelected: {
      scale: 1,
      transition: {
        type: "easeOut",
      },
    },
  };

  return (
    <Flex
      gap={isLargeSize ? 4 : 1}
      alignItems={"center"}
      justifyContent={"center"}
      height={{ lg: 110, base: 16 }}
      marginBottom={{ lg: 12, base: 12 }}
    >
      {isLargeSize && (
        <Image height={50} src={process.env.PUBLIC_URL + typeIcon} />
      )}
      <Flex
        direction={"row"}
        maxWidth={{
          lg: 55 * numCols,
          base: 42 * numCols,
        }}
        minWidth={{
          lg: 55 * numCols,
          base: 42 * numCols,
        }}
        gap={{ base: 1, lg: 1 }}
        wrap={"wrap"}
        justifyContent={justifyContent}
      >
        {characters.map((character) => {
          const isGuessed = guesses.some(
            (guess) => character.name.toUpperCase() === guess.name.toUpperCase()
          );
          const isSelected = selected === character.name;
          return (
            <Popover isOpen={isSelected} placement="bottom">
              <PopoverTrigger>
                <IconButton
                  as={motion.button}
                  aria-label="Select Character"
                  key={character.name}
                  bgColor={isSelected ? "#f06414" : "gray"}
                  height={{ lg: 50, sm: 38, base: 38 }}
                  maxWidth={{ lg: 50, sm: 38, base: 38 }}
                  minWidth={{ lg: 50, sm: 38, base: 38 }}
                  variants={iconButtonVariants}
                  animate={isSelected ? "selected" : "notSelected"}
                  zIndex={isSelected ? 1 : 0}
                  isDisabled={isDisabled || isGuessed}
                  onClick={() => {
                    isSelected
                      ? setCharacterGuess("")
                      : setCharacterGuess(character.name);
                  }}
                >
                  <Image
                    height={{ lg: 50, base: 38 }}
                    width={{ lg: 50, base: 38 }}
                    borderY={"2px solid #fff"}
                    backgroundImage={
                      isSelected
                        ? "radial-gradient(circle, #ff9c00,#ff9c00, #f06414, #ffff32)"
                        : ""
                    }
                    border={isSelected ? "2px solid #ffff32" : ""}
                    borderRadius={"md"}
                    loading="lazy"
                    src={character.img}
                    alt={character.name}
                  />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent
                width={"auto"}
                display={"flex"}
                flexShrink={1}
                position={"relative"}
                bottom={2}
              >
                <PopoverBody>
                  <Text
                    as="em"
                    size={{ base: "xs", lg: "lg" }}
                    style={styles.font}
                    color={"#f06414"}
                  >
                    {character.name.toUpperCase()}
                  </Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          );
        })}
      </Flex>
    </Flex>
  );
};
