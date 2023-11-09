import React from "react";
import Navbar from "../sections/Navbar";
import { ContainerLayout } from "../layout";
import { Books, BooksTitle } from "../sections";
import { EditBookModal, AddBookModal } from "../ui"

const Home = () => {
  return (
    <ContainerLayout>
      <Navbar />
      <BooksTitle />
      <Books />
      <AddBookModal />
      <EditBookModal />
    </ContainerLayout>
  );
};

export default Home;
