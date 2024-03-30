import React from "react";
import { Flex } from "@chakra-ui/react";
import { Styles } from "./util/interfaces";
import { Header } from "./Header";
import { App } from "./app/App";
import { Footer } from "./Footer";

const Home = () => {
  return (
    <Flex
      p={4}
      width={"100%"}
      height={"100vh"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Header />
      <App />
      <Footer />
    </Flex>
  );
};

export default Home;
