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
    <Flex gap={3} alignItems={"center"} justifyContent={"center"} height={110}>
      <Image height={50} src={process.env.PUBLIC_URL + typeIcon} />
      <Flex
        direction={"row"}
        maxWidth={55 * numCols}
        minWidth={55 * numCols}
        gap={1}
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
              height={50}
              width={50}
              onClick={() => {
                setCharacterGuess(character.name);
              }}
            >
              <Image
                height={50}
                width={50}
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
