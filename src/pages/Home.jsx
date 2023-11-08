import React from "react";
import Navbar from "../sections/Navbar";
import { ContainerLayout } from "../layout";
import { Books, BooksTitle } from "../sections";

const Home = () => {
  return (
    <ContainerLayout>
      <Navbar />
      <BooksTitle />
      <Books />
    </ContainerLayout>
  );
};

export default Home;
