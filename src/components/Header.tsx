import { Box, Flex, Image } from "@chakra-ui/react";
import { styles } from "./util/consts";

export const Header = () => {
  return (
    <Flex
      align="center"
      justify="center"
      width={"100vw"}
      bg={"rgba(229, 235, 244, .8)"}
    >
      <Image
        src={process.env.PUBLIC_URL + "/OverwatchleLogo.png"}
        alt="Overwatchle logo"
        height={"10vh"}
      />
    </Flex>
  );
};
