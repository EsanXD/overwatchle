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
import { HeroSelect } from "../heroSelect/HeroSelect";
import { useEffect, useState } from "react";
import { Character, DailyWord } from "../util/interfaces";
import { ScoreModal } from "../modals/Score";
import { EndlessModal } from "../modals/Endless";
import { TutorialModal } from "../modals/Tutorial";
import { Settings } from "../menu/Settings";
import { DateTime } from "luxon";
import { Scoreboard } from "../scoreboard.tsx/Scoreboard";

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

  const dummy: Character = {
    name: "D.VA",
    gender: "female",
    role: "tank",
    race: "human",
    org: "overwatch",
    projectileType: "hitscan",
    releaseYear: 2016,
    img: "https://d15f34w2p8l1cc.cloudfront.net/overwatch/ca114f72193e4d58a85c087e9409242f1a31e808cf4058678b8cbf767c2a9a0a.png",
  };

  const guesses: Character[] = [
    {
      name: "DOOMFIST",
      gender: "male",
      role: "tank",
      race: "human",
      org: "talon",
      projectileType: "projectile",
      releaseYear: 2017,
      img: "https://d15f34w2p8l1cc.cloudfront.net/overwatch/13750471c693c1a360eb19d5ace229c8599a729cd961d72ebee0e157657b7d18.png",
    },
    {
      name: "JUNKER QUEEN",
      gender: "female",
      role: "tank",
      race: "human",
      org: "junker",
      projectileType: "hitscan",
      releaseYear: 2022,
      img: "https://d15f34w2p8l1cc.cloudfront.net/overwatch/cef2406b2244b80506f83b8fb9ebaf214f41fa8795cbeef84026cd8018561d04.png",
    },
    {
      name: "ORISA",
      gender: "female",
      role: "tank",
      race: "omnic",
      org: "overwatch",
      projectileType: "projectile",
      releaseYear: 2017,
      img: "https://d15f34w2p8l1cc.cloudfront.net/overwatch/71e96294617e81051d120b5d04b491bb1ea40e2933da44d6631aae149aac411d.png",
    },
    {
      name: "ECHO",
      gender: "female",
      role: "dps",
      race: "omnic",
      org: "overwatch",
      projectileType: "projectile/beam",
      releaseYear: 2020,
      img: "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f086bf235cc6b7f138609594218a8385c8e5f6405a39eceb0deb9afb429619fe.png",
    },
  ];

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

      <Scoreboard guesses={guesses} actual={dummy} />

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
