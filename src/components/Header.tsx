import { Flex, Image } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex
      align="center"
      justify="center"
      width={"100vw"}
      bg={"rgba(229, 235, 244, .8)"}
      px={4}
    >
      <Image
        src={process.env.PUBLIC_URL + "/OverwatchleLogo.svg"}
        alt="Overwatchle logo"
        height={"10vh"}
      />
    </Flex>
  );
};
