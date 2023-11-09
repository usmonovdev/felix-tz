import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { IconCloseModal } from "../icons";
import { FormForUserRegister } from "../styled/StyledTags";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { generateSign } from "../utils/signGenerate";
import { useDispatch, useSelector } from "react-redux";
import { addBooksOpen, editBooksClose, getBooksSuccess } from "../store/books-slice";
import * as Yup from "yup";
import axios from "../utils/axios.config";

const Style = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  padding: "30px 20px",
  width: "400px",
  "@media(max-width: 600px)": {
    width: "90%",
    margin: "0 auto",
  },
  borderRadius: "12px",
}));

const EditBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [message, setMessage] = useState(false);
  const { books, editBooks } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      published: "",
      pages: "",
      isbn: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "Min length is 5")
        .max(30, "Max length is 30")
        .required("Title is required"),

      author: Yup.string()
        .min(6, "Min length is 6")
        .max(25, "Max length is 25")
        .required("Author is required"),

      published: Yup.number().required("Published is required"),

      pages: Yup.number().required("Pages is required"),

      isbn: Yup.string().required("ISBN is required"),
    }),
    onSubmit: async (values, helpers) => {
      const key = localStorage.getItem("key");
      setIsLoading(true);
      const body = {
        title: values.title,
        cover: "http://url.to.book.cover",
        author: values.author,
        published: values.published,
        pages: values.pages,
        isbn: values.isbn,
      };
      const sign = generateSign("POST", body, "/books");
      try {
        const response = await axios.post("/books", body, {
          headers: {
            Key: key,
            Sign: sign,
          },
        });
        dispatch(getBooksSuccess([...books, response.data?.data]));
        dispatch(addBooksOpen());
        if (books.length == 0) {
          window.location.reload()
        }
        setIsLoading(false);
        setMessage(true);
        helpers.resetForm();
      } catch (error) {
        setIsLoading(false);
        setIsError(error?.response?.data?.message);
      }
    },
  });

  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(false);
  };

  const handleClose = () => {
    dispatch(editBooksClose());
    setIsError(null);
    formik.resetForm();
  };

  return (
    <>
      <Snackbar
        open={message}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        message="Book Status Edited!"
      >
        <Alert
          onClose={handleCloseMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          Book Status Edited!
        </Alert>
      </Snackbar>
      <Modal open={editBooks} onClose={handleClose}>
        <Style>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Book Status
            </Typography>
            <IconButton onClick={handleClose}>
              <IconCloseModal />
            </IconButton>
          </Box>
          <FormForUserRegister noValidate onSubmit={formik.handleSubmit}>
            <TextField
              id="title"
              label="Title"
              type="text"
              helperText={formik.touched.title && formik.errors.title}
              error={!!(formik.touched.title && formik.errors.title)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
              required
            />
            <TextField
              id="author"
              label="Author"
              type="text"
              helperText={formik.touched.author && formik.errors.author}
              error={!!(formik.touched.author && formik.errors.author)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.author}
              required
            />
            <TextField
              id="published"
              label="Published (Year)"
              type="number"
              helperText={formik.touched.published && formik.errors.published}
              error={!!(formik.touched.published && formik.errors.published)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.published}
              required
            />
            <TextField
              id="pages"
              label="Pages"
              type="number"
              helperText={formik.touched.pages && formik.errors.pages}
              error={!!(formik.touched.pages && formik.errors.pages)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.pages}
              required
            />
            <TextField
              id="isbn"
              label="ISBN"
              type="text"
              helperText={formik.touched.isbn && formik.errors.isbn}
              error={!!(formik.touched.isbn && formik.errors.isbn)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.isbn}
              required
            />
            {isError && (
              <Typography
                variant="caption"
                color={"error.main"}
                textAlign={"center"}
              >
                {isError}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <Button variant="outlined" fullWidth onClick={handleClose}>
                Close
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                fullWidth
                loading={isLoading}
              >
                Add
              </LoadingButton>
            </Box>
          </FormForUserRegister>
        </Style>
      </Modal>
    </>
  );
};

export default EditBook;
