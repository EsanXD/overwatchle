import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { styles } from "../util/consts";

export const Menu = ({
  setEndless,
  showMenu,
}: {
  setEndless: any;
  showMenu: any;
}) => {
  return (
    <>
      <Flex
        width={"100vw"}
        height={"100vh"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"start"}
        bg={"rgba(229, 235, 244, .8)"}
      >
        <Spacer />
        <Heading
          size={{ base: "3xl", sm: "3xl", md: "4xl", lg: "4xl" }}
          style={styles.font}
          color={"#f06414"}
          as="em"
          _hover={{
            fontSize: "2.5xl",
            transform: "scale(1.25) translate(50px)",
            cursor: "pointer",
            transition:
              "font-size 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
          onClick={() => {
            setEndless(false);
            showMenu(false);
          }}
        >
          PLAY DAILY
        </Heading>
        <Heading
          size={{ base: "2xl", sm: "2xl", md: "4xl", lg: "4xl" }}
          style={styles.font}
          as="em"
          _hover={{
            fontSize: "2.5xl",
            transform: "scale(1.25) translate(50px)",
            cursor: "pointer",
            transition:
              "font-size 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
          onClick={() => {
            setEndless(false);
            showMenu(false);
          }}
        >
          ENDLESS
        </Heading>
        <Heading
          size={{ base: "xl", sm: "xl", md: "2xl", lg: "2xl" }}
          style={styles.font}
          as="em"
          _hover={{
            fontSize: "2.5xl",
            transform: "scale(1.25) translate(50px)",
            cursor: "pointer",
            transition:
              "font-size 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          HOW TO PLAY
        </Heading>
        <Spacer />
        <Spacer />
      </Flex>
    </>
  );
};
