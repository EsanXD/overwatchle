import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Styles, dailyWord as DailyWord } from "./util/interfaces";
import { Header } from "./Header";
import { App } from "./app/App";
import { Footer } from "./Footer";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState<DailyWord[]>([]);
  const [endless, setEndless] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://overwatchle-api.fly.dev/daily"
        );
        const resp = JSON.parse(atob(atob(atob(response.data))));
        setData(resp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
    >
      <Header />
      <App endless={endless} data={data} />
    </Flex>
  );
};

export default Home;
