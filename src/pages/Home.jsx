import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import md5 from "md5";
import axios from "../utils/axios.config";
import Navbar from "../sections/Navbar";
import { ContainerLayout } from "../layout";

const Home = () => {
  const secret = localStorage.getItem("secret");
  const key = localStorage.getItem("key");
  const method = "POST";
  const url = "/books";
  const body = {
    isbn: "0452147093",
  };

  const stringToSign = `${method}${url}${JSON.stringify(body)}${secret}`;
  const sign = md5(stringToSign);
  console.log(stringToSign);
  console.log(md5(stringToSign));

  const getBooks = async () => {
    try {
      const res = await axios.post("/books", body, {
        headers: {
          Key: key,
          Sign: sign,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks()
  }, [secret, key]);

  return (
    <ContainerLayout>
      <Navbar />
    </ContainerLayout>
  );
};

export default Home;
