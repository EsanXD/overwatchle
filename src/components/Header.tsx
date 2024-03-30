import { Box, Flex, Image } from "@chakra-ui/react";
import { styles } from "./util/consts";

export const Header = () => {
  return (
    <Box>
      <Flex maxW="container.lg" mx="auto" align="center" justify="center">
        <Image
          src={process.env.PUBLIC_URL + "/OverwatchleLogo.png"}
          alt="Overwatchle logo"
          width={"90vw"}
          height={"8vh"}
        />
      </Flex>
    </Box>
  );
};
