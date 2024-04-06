import { Flex, IconButton, Image } from "@chakra-ui/react";
import { tank, dps, support } from "../util/characters";

export const HeroPool = ({
  selected,
  numCols,
  type,
  setCharacterGuess,
}: {
  selected: string;
  numCols: number;
  type: string;
  setCharacterGuess: any;
}) => {
  const characters = type === "support" ? support : type === "dps" ? dps : tank;
  const typeIcon =
    type === "support"
      ? "/Circle_Support.svg"
      : type === "dps"
      ? "/Circle_Damage.svg"
      : "/Circle_Tank.svg";

  return (
    <Flex gap={4} alignItems={"center"} justifyContent={"center"} height={{lg: 110, sm: 24, base: 16}}>
      <Image
        height={{ lg: 50, sm: 12, base: 8 }}
        src={process.env.PUBLIC_URL + typeIcon}
      />
      <Flex
        direction={"row"}
        maxWidth={{
          lg: 55 * numCols,
          sm: 44 * numCols,
          base: 32 * numCols,
        }}
        minWidth={{
          lg: 55 * numCols,
          sm: 44 * numCols,
          base: 32 * numCols,
        }}
        gap={{ base: 0, sm: 0, md: 0, lg: 1 }}
        wrap={"wrap"}
        justifyContent={"center"}
      >
        {characters.map((character) => {
          const isSelected = selected === character.name;
          return (
            <IconButton
              aria-label="Select Character"
              key={character.name}
              bgColor={"gray"}
              height={{ lg: 50, sm: 38, base: 8 }}
              maxWidth={{ lg: 50, sm: 38, base: 8 }}
              minWidth={{ lg: 50, sm: 38, base: 8 }}
              onClick={() => {
                setCharacterGuess(character.name);
              }}
            >
              <Image
                height={{ lg: 50, sm: 38, base: 8 }}
                width={{ lg: 50, sm: 38, base: 8 }}
                borderY={"2px solid #fff"}
                //TODO Expand to make look better
                border={isSelected ? "4px solid gold" : ""}
                borderRadius={"md"}
                loading="lazy"
                src={character.img}
                alt={character.name}
              />
            </IconButton>
          );
        })}
      </Flex>
    </Flex>
  );
};
