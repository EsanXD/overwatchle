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

export const Scoreboard = ({
  guesses,
  actual,
  isLargeSize,
}: {
  guesses: Character[];
  actual: Character;
  isLargeSize: boolean;
}) => {
  const headers = ["", "", "GENDER", "RACE", "ORG", "PROJECTILE", "RELEASE"];
  const roleIcon = {
    tank: "/Circle_Tank.svg",
    dps: "/Circle_Damage.svg",
    support: "/Circle_Support.svg",
  };

  return (
    <Flex flexDirection={"column"} alignItems={"center"} zIndex={1}>
      <TableContainer borderRadius={8} overflowX="auto" maxWidth={"100vw"}>
        <Table align="center" variant={"simple"} bg={"black"} sx={styles.font}>
          <Thead bgColor={"white"}>
            <Tr>
              {headers.map((header) => (
                <Th textAlign={"center"} sx={styles.font}>
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {guesses.map((guess, index) => {
              const isCorrect = guess.name === actual.name;
              const role = guess.role === actual.role;
              const gender = guess.gender === actual.gender;
              const org = guess.org === actual.org;
              const race = guess.race === actual.race;
              const projectileType =
                guess.projectileType === actual.projectileType;
              const releaseYear = guess.releaseYear === actual.releaseYear;
              const fieldGuesses: boolean[] = [
                isCorrect,
                role,
                gender,
                org,
                race,
                projectileType,
                releaseYear,
              ];
              const numCorrect = fieldGuesses.filter((f) => f).length;
              const percentCorrect = Math.ceil(
                (numCorrect / fieldGuesses.length) * 100
              );
              const red = "#E82D4F";
              const green = "#01BA01";

              return (
                <>
                  <Tr
                    key={guess.name}
                    bgColor={"rgba(40, 208, 240, 1)"}
                    color={"white"}
                  >
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
                        justifyContent={"space-around"}
                        bgColor={isCorrect ? green : red}
                        pr={4}
                      >
                        <Image height={50} src={guess.img} mr={12} />
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
                            h={"50px !important"}
                            borderRadius={"50%"}
                            backgroundImage={`conic-gradient(#f99e1a 0%, #f99e1a ${percentCorrect}%, #43484c ${percentCorrect}%, #43484c 100%)`}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Flex
                              w={"40px"}
                              h={"40px"}
                              borderRadius={"50%"}
                              bgColor={isCorrect ? green : red}
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
                        bgColor={org ? green : red}
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
                        bgColor={projectileType ? green : red}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {guess.projectileType.toUpperCase()}
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
                        {guess.releaseYear}
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
