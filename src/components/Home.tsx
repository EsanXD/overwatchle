import React from "react";
import { Flex } from "@chakra-ui/react";
import { Styles } from "./util/interfaces";
import { Header } from "./Header";
import { App } from "./app/App";
import { Footer } from "./Footer";

const Home = () => {
  return (
    <Flex p={8} style={{ ...styles.flexContainer, ...styles.body }}>
      <Header />
      <App />
      <Footer />
    </Flex>
  );
};

const styles: Styles = {
  body: {
    width: "100%",
    height: "100vh",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
export default Home;
