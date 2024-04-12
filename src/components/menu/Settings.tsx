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
  easyMode,
  onClose,
  openMenu,
  openTutorial,
  toggleEasyMode,
}: {
  easyMode: boolean;
  onClose: () => void;
  openMenu: () => void;
  openTutorial: () => void;
  toggleEasyMode: () => void;
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
                    "https://th.bing.com/th/id/OIG3.h98jBeAgVndtHVswq2XN?pid=ImgGn"
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
            <Card maxW="sm" onClick={toggleEasyMode}>
              <CardBody p={1}>
                <Image
                  src={
                    easyMode
                      ? "https://th.bing.com/th/id/OIG2.WN6Zax33K7zE5SlbMgpM?pid=ImgGn"
                      : "https://th.bing.com/th/id/OIG2.LMMJuEtWjNBYeQT0Akye?pid=ImgGn"
                  }
                  alt="alt"
                  height={"20vh"}
                />
                <Button
                  colorScheme={easyMode ? "blue" : "red"}
                  width={"100%"}
                  style={styles.font}
                  borderRadius={0}
                  fontSize={{ base: "xs", sm: "xs", md: "xs", lg: "md" }}
                >
                  {easyMode ? "EASY MODE" : "HARD MODE"}
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
                    "https://th.bing.com/th/id/OIG3._cVB3rXkyNU3O3x_DJWx?pid=ImgGn"
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
