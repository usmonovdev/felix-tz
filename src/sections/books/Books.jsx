import React from "react";
import { Typography, Grid, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import BookCards from "../../ui/BookCards";

const Section = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
}));

const Books = () => {
  const { books, loading } = useSelector((state) => state.books);

  if (loading == true) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 200px)",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (books?.length == 0 || books == null) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 200px)",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color={"error.main"}>
          Books are not available!
        </Typography>
      </Box>
    );
  }

  return (
    <Section>
      <Typography
        variant="h6"
        sx={{
          color: "background.paper",
          "@media (max-width: 600px)": {
            color: "primary.main",
          },
          marginTop: "10px",
        }}
      >
        Your task today
      </Typography>
      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        {books?.map((data) => {
          return (
            <Grid item xs={4} sm={4} md={4} key={data?.book?.isbn}>
              <BookCards book={data.book == undefined ? data : data.book} />
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
};

export default Books;
