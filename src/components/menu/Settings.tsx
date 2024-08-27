import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Flex,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  CardBody,
  Card,
  Image,
  Button,
} from "@chakra-ui/react";
import { styles } from "../util/consts";

export const Settings = ({
  onClose,
  openMenu,
  openTutorial,
}: {
  onClose: () => void;
  openMenu: () => void;
  openTutorial: () => void;
}) => {
  return (
    <Drawer isOpen={true} placement="left" size={"xs"} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bgColor={"#43484c"}>
        <DrawerCloseButton size={"lg"} color={"#f06414"} />
        <DrawerHeader
          as={"em"}
          fontSize={40}
          py={0}
          color={"#f06414"}
          style={styles.font}
        >
          SETTINGS
        </DrawerHeader>
        <DrawerBody>
          <Flex
            width={"100%"}
            height={"100%"}
            flexDirection={"column"}
            gap={4}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Card maxW="sm" onClick={openMenu}>
              <CardBody p={1}>
                <Image
                  src={
                    "https://static.wikia.nocookie.net/overwatch_gamepedia/images/2/28/PI_Overwatch_Esports.png/revision/latest?cb=20240228082830"
                  }
                  alt="alt"
                  height={"20vh"}
                />
                <Button
                  style={styles.font}
                  colorScheme={"orange"}
                  width={"100%"}
                  borderRadius={0}
                  fontSize={{ base: "xs", sm: "xs", md: "xs", lg: "md" }}
                >
                  {"MAIN MENU"}
                </Button>
              </CardBody>
            </Card>

            <Card
              maxW="sm"
              onClick={() => {
                openTutorial();
                onClose();
              }}
            >
              <CardBody p={1}>
                <Image
                  src={
                    "https://static.wikia.nocookie.net/overwatch_gamepedia/images/5/51/PI_Training_Bot.png/revision/latest?cb=20240228133653"
                  }
                  alt="alt"
                  height={"20vh"}
                />
                <Button
                  style={styles.font}
                  colorScheme={"orange"}
                  width={"100%"}
                  borderRadius={0}
                  fontSize={{ base: "xs", sm: "xs", md: "xs", lg: "md" }}
                >
                  {"HOW TO PLAY"}
                </Button>
              </CardBody>
            </Card>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
