import React from "react";
import { styled } from "@mui/system";
import { Typography, Box, useTheme, Paper, IconButton } from "@mui/material";
import { IconDelete, IconEdit } from "../icons";
import axios from "../utils/axios.config";
import { generateSign } from "../utils/signGenerate";
import { useDispatch, useSelector } from "react-redux";
import { getBooksSuccess } from "../store/books-slice";

const Card = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[22],
  padding: "15px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  position: "relative",
  ":hover .book-events": {
    transform: "translateX(0px)",
    opacity: 1,
    zIndex: "10",
  },
}));

const BookEvents = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  position: "absolute",
  top: "-40px",
  right: "20px",
  width: "80px",
  display: "flex",
  flexDirection: "row",
  gap: "4px",
  boxShadow: 0,
  transform: "translateY(20px)",
  opacity: 0,
  zIndex: "-1",
  transition: "300ms",
}));

const DeleteButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  border: "none",
  padding: "4px",
  width: "100%",
  cursor: "pointer",
  height: "40px",
  borderRadius: "8px 8px 8px 0px",
  boxShadow: theme.shadows[10],
}));

const EditButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: "none",
  padding: "4px",
  width: "100%",
  cursor: "pointer",
  height: "40px",
  borderRadius: "8px 8px 0px 8px",
  boxShadow: theme.shadows[10],
}));

const BookCards = ({ book }) => {
  const theme = useTheme();
  const booksState = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleDeleteBook = async (id) => {
    const key = localStorage.getItem("key");
    const sign = generateSign("DELETE", "", `/books/${id}`);
    try {
      const books = booksState.books;
      const filterBooks = books.filter((e) => e.book.id !== id);
      const { data } = await axios.delete(`/books/${id}`, {
        headers: {
          Key: key,
          Sign: sign,
        },
      });
      if (data.isOk == true) {
        dispatch(getBooksSuccess(filterBooks));
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Card>
      <Typography variant="h6">
        {book?.title?.length == 0 ? "Lorem ipsum dolor sit" : book?.title}
      </Typography>
      <Typography variant="subtitle1">
        Lorem ipsum dolor sit amet consectetur. Id suspendisse nascetur elit
        laoreet ornare augue interdum. Sociis mattis senectus vulputate nisi leo
        urna. Accumsan ornare consectetur semper convallis ultricies quam.
      </Typography>
      <Typography
        variant="body"
        sx={{
          color: theme.palette.success.main,
          backgroundColor: theme.palette.success.alpha8,
          padding: "4px 10px",
          borderRadius: "10px",
        }}
      >
        {book?.isbn?.length == 0
          ? "2011 - year"
          : `ISBN: ${book?.isbn}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body">
          {book?.author?.length == 0 ? "Eben Upton:" : `${book?.author}:`}
        </Typography>
        <Typography
          variant="body"
          sx={{
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.alpha8,
            padding: "4px 10px",
            borderRadius: "10px",
          }}
        >
          {book?.author?.length == 0
            ? "2011 - year"
            : `${book?.published} - year`}
        </Typography>
      </Box>
      <BookEvents className="book-events">
        <EditButton>
          <IconEdit />
        </EditButton>
        <DeleteButton onClick={() => handleDeleteBook(book.id)}>
          <IconDelete />
        </DeleteButton>
      </BookEvents>
    </Card>
  );
};

export default BookCards;
