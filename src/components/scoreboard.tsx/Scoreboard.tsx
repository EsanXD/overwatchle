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
}: {
  guesses: Character[];
  actual: Character;
}) => {
  const roleIcon = {
    tank: "/Circle_Tank.svg",
    dps: "/Circle_Damage.svg",
    support: "/Circle_Support.svg",
  };

  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <TableContainer>
        <Table variant={"unstyled"} bg={"white"} borderRadius={4}>
          <Thead>
            <Tr>
              <Th>Role</Th>
              <Th>Character</Th>
              <Th>Gender</Th>
              <Th>Race</Th>
              <Th>Org</Th>
              <Th>Projectile Type</Th>
              <Th>Release</Th>
            </Tr>
          </Thead>
          <Tbody>
            {guesses.map((guess, index) => {
              //TODO Compare to actual
              return (
                <>
                  <Tr key={guess.name} bgColor={"#218ffe"}>
                    <Td>
                      <Image
                        height={50}
                        src={process.env.PUBLIC_URL + roleIcon[guess.role]}
                        borderRadius={"full"}
                        bgColor={"green"}
                      />
                    </Td>
                    <Td>
                      <Image bgColor={"grey"} height={50} src={guess.img} />
                    </Td>
                    <Td>
                      <span className="material-symbols-outlined">
                        {guess.gender === "male"
                          ? "man"
                          : guess.gender === "female"
                          ? "woman"
                          : "robot"}
                      </span>
                    </Td>
                    <Td>{guess.race}</Td>
                    <Td>{guess.org}</Td>
                    <Td>{guess.projectileType}</Td>
                    <Td>{guess.releaseYear}</Td>
                  </Tr>
                  {index !== guesses.length - 1 && <Divider />}
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      //TODO only appear when size triggers table
      <Text>SCROLL HORIZONTALLY TO SEE MORE</Text>
    </Flex>
  );
};
