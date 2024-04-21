import { CheckIcon } from "@chakra-ui/icons";
import { styles } from "../util/consts";
import { Character } from "../util/interfaces";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
  Image,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { gradeGuess } from "../util/scoreboardUtil";

export const Scoreboard = ({
  guesses,
  actual,
  isLargeSize,
}: {
  guesses: Character[];
  actual: Character;
  isLargeSize: boolean;
}) => {
  const headers = [
    "",
    "",
    "SEX",
    "RACE",
    "ORGANIZATION",
    "PROJECTILE",
    "RELEASE",
  ];
  const roleIcon = {
    tank: "/Circle_Tank.svg",
    dps: "/Circle_Damage.svg",
    support: "/Circle_Support.svg",
  };
  const reversedList = guesses.slice().reverse();

  return (
    <Flex flexDirection={"column"} alignItems={"center"} zIndex={1}>
      <TableContainer
        borderRadius={8}
        overflowX="auto"
        overflowY="auto"
        maxWidth={"100vw"}
        maxHeight={isLargeSize ? "400" : "30vh"}
      >
        <Table align="center" variant={"simple"} sx={styles.font}>
          <Thead bgColor={"white"} pos={"sticky"} top={0}>
            <Tr pos={"sticky"}>
              {headers.map((header) => (
                <Th textAlign={"center"} sx={styles.font}>
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {reversedList.map((guess, index) => {
              const [
                isCorrect,
                role,
                gender,
                org,
                race,
                projectileType,
                releaseYear,
              ] = gradeGuess(guess, actual);
              const fieldGuesses: (boolean | undefined)[] = [
                role,
                gender,
                org,
                race,
                projectileType,
                releaseYear,
              ];
              const numCorrect = fieldGuesses.filter(
                (f) => typeof f === "undefined" || f
              ).length;
              const percentCorrect = Math.ceil(
                (numCorrect / fieldGuesses.length) * 100
              );
              const red = "rgba(232,45,79,0.85)";
              const green = "rgba(1,186,1,0.7)";
              const orange = "rgba(255,163,1,0.8)";
              const darkGrey = "#272C3A";

              return (
                <>
                  <Tr key={guess.name} color={"white"}>
                    <Td p={0}>
                      <Image
                        height={50}
                        src={process.env.PUBLIC_URL + roleIcon[guess.role]}
                        bgColor={role ? green : red}
                      />
                    </Td>

                    <Td p={0}>
                      <Flex
                        gap={4}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        bgColor={isCorrect ? green : red}
                        flex={1}
                        minWidth={"300"}
                        pr={4}
                      >
                        <Image height={50} src={guess.img} />
                        <Text
                          flex={1}
                          style={styles.font}
                          as="em"
                          textAlign={"start"}
                        >
                          {guess.name.toUpperCase()}
                        </Text>
                        {isCorrect ? (
                          <Flex
                            minWidth={"50px"}
                            h={"50px"}
                            borderRadius={"50%"}
                            bgImage={
                              "radial-gradient(circle, white,#CCFEFF,#28D0F0, #1E7AE9)"
                            }
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <CheckIcon
                              w={30}
                              h={30}
                              fontSize={20}
                              color={"#1E7AE9"}
                            />
                          </Flex>
                        ) : (
                          <Flex
                            minWidth={"50px"}
                            h={"50px"}
                            borderRadius={"50%"}
                            backgroundImage={`conic-gradient(#f99e1a 0%, #f99e1a ${percentCorrect}%, #43484c ${percentCorrect}%, #43484c 100%)`}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Flex
                              w={"40px"}
                              h={"40px"}
                              borderRadius={"50%"}
                              bgColor={darkGrey}
                              justifyContent={"center"}
                              alignItems={"center"}
                            >
                              {percentCorrect}
                            </Flex>
                          </Flex>
                        )}
                      </Flex>
                    </Td>

                    <Td p={0}>
                      <Flex
                        mx={"auto"}
                        justifyContent={"center"}
                        bgColor={gender ? green : red}
                        w={"100%"}
                        h={50}
                      >
                        <Flex justifyContent={"center"} alignItems={"center"}>
                          <span className="material-symbols-outlined">
                            {guess.gender === "male"
                              ? "male"
                              : guess.gender === "female"
                              ? "female"
                              : "agender"}
                          </span>
                        </Flex>
                      </Flex>
                    </Td>

                    <Td p={0}>
                      <Flex
                        h={50}
                        w={"100%"}
                        bgColor={race ? green : red}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {guess.race.toUpperCase()}
                      </Flex>
                    </Td>

                    <Td p={0}>
                      <Flex
                        h={50}
                        w={"100%"}
                        bgColor={
                          typeof org === "undefined"
                            ? orange
                            : org
                            ? green
                            : red
                        }
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {guess.org.toUpperCase()}
                      </Flex>
                    </Td>

                    <Td p={0}>
                      <Flex
                        h={50}
                        w={"100%"}
                        bgColor={
                          typeof projectileType === "undefined"
                            ? orange
                            : projectileType
                            ? green
                            : red
                        }
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {guess.projectiletype.toUpperCase()}
                      </Flex>
                    </Td>

                    <Td p={0}>
                      <Flex
                        h={50}
                        w={"100%"}
                        bgColor={releaseYear ? green : red}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {guess.releaseyear}
                      </Flex>
                    </Td>
                  </Tr>
                  {index !== guesses.length - 1 && <Divider />}
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {!isLargeSize && (
        <Text>
          {"<--"}SCROLL HORIZONTALLY TO SEE MORE{"-->"}
        </Text>
      )}
    </Flex>
  );
};
