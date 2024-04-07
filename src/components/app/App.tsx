import {
  Flex,
  Input,
  Image,
  Heading,
  Spacer,
  Button,
  Text,
  Skeleton,
  Switch,
  Select,
  useBreakpointValue,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  CardBody,
  Card,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { abilities, styles } from "../util/consts";
import { HeroSelect } from "./HeroSelect";
import { useEffect, useState } from "react";
import { DailyWord } from "../util/interfaces";
import { ScoreModal } from "../modals/Score";
import { EndlessModal } from "../modals/Endless";
import { TutorialModal } from "../modals/Tutorial";

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
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<any>(ModalStates.TUTORIAL);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedCharcter, setCharacter] = useState("");
  const [ability, setAbility] = useState("");
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [easyMode, setEasyMode] = useState(false);
  const [endlessData, setEndlessData] = useState<DailyWord>(
    abilities[Math.floor((Math.random() * 100000) % abilities.length)]
  );
  const [previousData, setPreviousData] = useState<DailyWord>(endlessData);
  const [strikes, setStrikes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [availableAbilities, setAvailableAbilities] = useState<DailyWord[]>([]);

  const isLargeSize = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    const available = abilities.filter(
      (hero) =>
        sanitizeText(hero.hero.toUpperCase()) ===
        sanitizeText(selectedCharcter.toUpperCase())
    );
    setAvailableAbilities(available);
    easyMode &&
      setAbility(
        available.length > 0 ? available[0].ability.toUpperCase() : ""
      );
  }, [selectedCharcter]);

  const handleChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>
  ) => setAbility(event.currentTarget.value);

  const sanitizeText = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
  };

  const getStrikeIcons = () => {
    let icons = [];
    for (let i = 0; i < 5; i++) {
      icons.push(
        i < strikes ? (
          <CloseIcon color={"red"} />
        ) : (
          <CloseIcon color={"green"} />
        )
      );
    }
    return icons;
  };

  const handleSubmit = () => {
    if (!selectedCharcter || !ability || turn === 3 || data.length === 0)
      return;
    let pointsGained = 0;
    if (sanitizeText(ability) === sanitizeText(data[turn].ability)) {
      pointsGained += 2;
    }
    if (sanitizeText(selectedCharcter) === sanitizeText(data[turn].hero)) {
      pointsGained += 1;
    }
    setPreviousData(data[turn]);
    setScore(score + pointsGained);
    setScores([...scores, pointsGained]);
    setAbility("");
    turn === 2 && setGameOver(true);
    setTurn(turn + 1);
    setGuesses([...guesses, `${selectedCharcter}: ${ability}`]);
    setCharacter("");
    setModalActive(ModalStates.SHOW_SCORE);
  };

  const handleSubmitEndless = () => {
    if (!selectedCharcter || !ability) return;
    let pointsLost = 0;
    if (sanitizeText(ability) !== sanitizeText(endlessData.ability)) {
      pointsLost += 1;
    }
    if (sanitizeText(selectedCharcter) !== sanitizeText(endlessData.hero)) {
      pointsLost += 2;
    }
    setPreviousData(endlessData);
    setEndlessData(
      abilities[Math.floor((Math.random() * 100000) % abilities.length)]
    );
    setAbility("");
    setStrikes(strikes + pointsLost);
    setTurn(turn + 1);
    setCharacter("");
    if (strikes + pointsLost >= 5) {
      setGameOver(true);
      setModalActive(ModalStates.GAME_OVER);
    } else {
      setModalActive(ModalStates.SHOW_SCORE);
    }
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
    >
      {/* <Flex p={4} gap={1} alignSelf={"end"} alignItems={"center"}>
        <Text style={styles.font}>EASY MODE</Text>
        <Switch
          colorScheme="orange"
          onChange={(event) => setEasyMode(event.target.checked)}
        ></Switch>
      </Flex> */}

      <Flex justifyContent={"center"} alignItems={"center"}>
        <IconButton
          position={"absolute"}
          left={4}
          aria-label="settings"
          onClick={() => setOpenMenu(true)}
          icon={<HamburgerIcon />}
        />
        <Flex flexDirection={"column"} alignItems={"center"}>
          {gameOver ? (
            <Heading style={styles.font}>GAME OVER</Heading>
          ) : (
            <Heading style={styles.font}>STAGE {turn + 1}</Heading>
          )}
          <Heading style={styles.font}>SCORE: {score}</Heading>
        </Flex>
      </Flex>
      {endless && <Flex>{getStrikeIcons()}</Flex>}
      {(endless || (!endless && turn < 3 && data.length > 0)) && (
        <Image
          loading="lazy"
          width={"40vw"}
          src={endless ? endlessData.img : data[turn].img}
        />
      )}
      {gameOver && !endless && (
        <Flex
          flexDirection={"row"}
          gap={4}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {data.map((turn, index) => (
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"30vw"}
            >
              <Image loading="lazy" width={"20vw"} src={turn.img} />
              <Text style={styles.font} textAlign={"center"}>
                {turn.hero.toUpperCase()}: {turn.ability.toUpperCase()}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}

      {easyMode ? (
        <Select
          disabled={selectedCharcter === "" || (turn === 3 && !endless)}
          maxWidth={"50vw"}
          value={ability}
          onChange={handleChange}
          style={styles.font}
          bg={"rgb(229, 235, 244)"}
        >
          {availableAbilities.map((hero) => (
            <option value={hero.ability}>{hero.ability.toUpperCase()}</option>
          ))}
        </Select>
      ) : (
        <Input
          isDisabled={turn === 3 && !endless}
          maxWidth={"50vw"}
          value={ability}
          onChange={handleChange}
          style={styles.font}
          placeholder="GUESS THE ABILITY"
        />
      )}
      <Flex
        direction={"row"}
        wrap={"wrap"}
        gap={50}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HeroSelect
          isDisabled={turn === 3 && !endless}
          selected={selectedCharcter}
          setCharacterGuess={(character: string) => {
            setCharacter(character);
          }}
        />
      </Flex>
      <Button
        style={{ ...styles.primary, ...styles.font }}
        onClick={endless ? handleSubmitEndless : handleSubmit}
        my={4}
      >
        SUBMIT GUESS
      </Button>

      {modalActive === ModalStates.SHOW_SCORE && (
        <ScoreModal
          endless={endless}
          data={previousData}
          onClose={() => {
            setModalActive(undefined);
          }}
          score={score}
        />
      )}
      {modalActive === ModalStates.GAME_OVER && (
        <EndlessModal
          turn={turn - 1}
          onClose={() => {
            setGameOver(false);
            setStrikes(0);
            setTurn(0);
            setModalActive(undefined);
          }}
        />
      )}
      {modalActive === ModalStates.TUTORIAL && (
        <TutorialModal onClose={() => setModalActive(undefined)} />
      )}
      <Drawer
        isOpen={openMenu}
        placement="left"
        size={"lg"}
        onClose={() => {
          setOpenMenu(false);
        }}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={"#43484c"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <DrawerCloseButton />
            <DrawerHeader
              as={"em"}
              fontSize={40}
              color={"#f06414"}
              style={styles.font}
            >
              SETTINGS
            </DrawerHeader>
          </Flex>

          <DrawerBody>
            <Flex
              width={"100%"}
              flexDirection={"column"}
              gap={4}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Card
                maxW="sm"
                onClick={() => {
                  setOpenMenu(false);
                  back();
                }}
              >
                <CardBody p={1}>
                  <Image
                    src={
                      "https://th.bing.com/th/id/OIG2.zYj6BYTMhJfHxsXuY3pw?pid=ImgGn"
                    }
                    alt="alt"
                    height={"20vh"}
                  />
                  <Button
                    style={styles.font}
                    colorScheme={"orange"}
                    width={"100%"}
                    borderRadius={0}
                  >
                    {"MAIN MENU"}
                  </Button>
                </CardBody>
              </Card>
              <Card maxW="sm" onClick={() => setEasyMode(!easyMode)}>
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
                  >
                    {easyMode ? "EASY MODE" : "HARD MODE"}
                  </Button>
                </CardBody>
              </Card>
              <Card
                maxW="sm"
                onClick={() => {
                  setOpenMenu(false);
                  setModalActive(ModalStates.TUTORIAL);
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
                  >
                    {"HOW TO PLAY"}
                  </Button>
                </CardBody>
              </Card>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
