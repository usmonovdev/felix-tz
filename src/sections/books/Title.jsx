import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { List } from "../../styled/Main";
import { SearchInput, Section, Span, Ul } from "../../styled/BooksTitleStyled";
import { IconAdd } from "../../icons";
import { generateSign } from "../../utils/signGenerate";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooksFail,
  getBooksStart,
  getBooksSuccess,
} from "../../store/books-slice";
import { AddBookModal } from "../../ui";
import axios from "../../utils/axios.config";

const Title = () => {
  const key = localStorage.getItem("key");
  const sign = generateSign("GET", "", "/books");
  const { books } = useSelector((state) => state.books);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const getBooks = async () => {
    dispatch(getBooksStart());
    try {
      const { data } = await axios.get("/books", {
        headers: {
          Key: key,
          Sign: sign,
        },
      });
      if (data.isOk == true) {
        dispatch(getBooksSuccess(data.data));
      }
    } catch (error) {
      dispatch(getBooksFail(error.response.data.message));
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <Section>
        <Typography variant="h1" color={"white"} sx={{ '@media(max-width: 600px)': {
          fontSize: '20px'
        } }}>
          You’ve got{" "}
          <Span>
            {books == null || books.length == 0 ? "0" : books.length} book
          </Span>{" "}
        </Typography>
        <Ul>
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
              "@media(max-width: 600px)": {
                width: "100%",
              },
            }}
          >
            <SearchInput placeholder="Search books" />
          </List>
          <List
            sx={{
              "@media(max-width: 600px)": {
                width: "100%",
              },
            }}
          >
            <Button
              variant="contained"
              fullWidth
              startIcon={<IconAdd />}
              onClick={() => setOpen(!open)}
            >
              Create a book
            </Button>
          </List>
        </Ul>
      </Section>
      <AddBookModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Title;
