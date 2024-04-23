import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import { styles } from "../util/consts";
import { TutorialModal } from "../modals/Tutorial";
import { useState } from "react";

export const Menu = ({
  setEndless,
  showMenu,
}: {
  setEndless: any;
  showMenu: any;
}) => {
  const [showTutorial, setShowTutorial] = useState(false);
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
        {showTutorial && (
          <TutorialModal onClose={() => setShowTutorial(false)} />
        )}
        <Spacer />
        <Heading
          size={{ base: "3xl", sm: "3xl", md: "4xl", lg: "4xl" }}
          style={styles.font}
          color={"#f06414"}
          as="em"
          _hover={{
            transform: "scale(1.25) translate(50px)",
          }}
          cursor="pointer"
          transition={"transform 0.3s linear"}
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
            transform: "scale(1.25) translate(50px)",
          }}
          cursor="pointer"
          transition={"transform 0.3s linear"}
          onClick={() => {
            setEndless(true);
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
            transform: "scale(1.25) translate(50px)",
          }}
          cursor="pointer"
          transition={"transform 0.3s linear"}
          onClick={() => setShowTutorial(true)}
        >
          HOW TO PLAY
        </Heading>
        <Spacer />
        <Spacer />
      </Flex>
    </>
  );
};
