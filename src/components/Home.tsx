import React, { useEffect, useState } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { Styles, DailyWord as DailyWord, Character } from "./util/interfaces";
import { Header } from "./Header";
import { App } from "./app/App";
import { Menu } from "./menu/Menu";
import axios from "axios";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { DateTime } from "luxon";
import { Characters } from "./util/characters";
const seedrandom = require("seedrandom");

const Home = () => {
  const [data, setData] = useState<Character | undefined>(undefined);
  const [endless, setEndless] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  const [init, setInit] = useState(false);

  const generateRandomChar = () => {
    const seed = DateTime.now().toFormat("dd/MM/yyyy");
    const rng = seedrandom(seed);
    const randomIndex = Math.floor((rng() * 100000) % Characters.length);
    return Characters[randomIndex];
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("visited");
    if (hasVisited) {
      setFirstTime(false);
    }
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
    const fetchData = async () => {
      setData(generateRandomChar());
    };
    fetchData();
  }, []);

  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      flexDirection={"column"}
      alignItems={"center"}
      background={"#43484c"}
      overflow={"hidden"}
    >
      <Header />
      {showMenu ? (
        <Menu setEndless={setEndless} showMenu={setShowMenu} />
      ) : data ? (
        <App
          firstTime={firstTime}
          endless={endless}
          data={data}
          back={() => setShowMenu(true)}
        />
      ) : (
        <Flex
          flex={1}
          bg={"rgba(229, 235, 244, .8)"}
          width={"100vw"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner
            thickness="8px"
            speed="0.7s"
            emptyColor="gray.200"
            color="orange.300"
            size="xl"
          />
        </Flex>
      )}
      {init && (
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 100,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: false,
          }}
        />
      )}
    </Flex>
  );
};

export default Home;
