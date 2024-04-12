import {
  Flex,
  Input,
  Image,
  Heading,
  Button,
  Text,
  Select,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { abilities, styles } from "../util/consts";
import { HeroSelect } from "./HeroSelect";
import { useEffect, useState } from "react";
import { DailyWord } from "../util/interfaces";
import { ScoreModal } from "../modals/Score";
import { EndlessModal } from "../modals/Endless";
import { TutorialModal } from "../modals/Tutorial";
import { Settings } from "../menu/Settings";
import { DateTime } from "luxon";

const ModalStates = {
  TUTORIAL: "tutorial",
  SHOW_SCORE: "showScore",
  GAME_OVER: "gameOver",
};

export const App = ({
  data,
  endless,
  back,
}: {
  data: DailyWord[];
  endless: boolean;
  back: any;
}) => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<any>(ModalStates.TUTORIAL);
  const [selectedCharcter, setCharacter] = useState("");

  const sanitizeText = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
  };

  return (
    <Flex
      bg={"rgba(229, 235, 244, .8)"}
      flexGrow={1}
      direction="column"
      align="center"
      justify="space-between"
      gap={2}
      width={"100vw"}
      overflow={"hidden"}
    >
      <Flex justifyContent={"center"} alignItems={"center"}>
        <IconButton
          position={"absolute"}
          left={4}
          aria-label="settings"
          colorScheme="orange"
          onClick={() => setSettingsOpen(true)}
          icon={<HamburgerIcon />}
        />
      </Flex>

      <Flex
        direction={"row"}
        wrap={"wrap"}
        gap={50}
        justifyContent={"center"}
        alignItems={"center"}
        pb={8}
      >
        <HeroSelect
          isDisabled={false}
          selected={selectedCharcter}
          setCharacterGuess={(character: string) => {
            setCharacter(character);
          }}
        />
      </Flex>

      {modalActive === ModalStates.TUTORIAL && (
        <TutorialModal onClose={() => setModalActive(undefined)} />
      )}
      {settingsOpen && (
        <Settings
          onClose={() => setSettingsOpen(false)}
          openMenu={back}
          openTutorial={() => setModalActive(ModalStates.TUTORIAL)}
        />
      )}
    </Flex>
  );
};
