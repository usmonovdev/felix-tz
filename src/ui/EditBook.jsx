import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { IconCloseModal } from "../icons";
import { LoadingButton } from "@mui/lab";
import { generateSign } from "../utils/signGenerate";
import { useDispatch, useSelector } from "react-redux";
import { editBooksClose } from "../store/books-slice";
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

const statuses = ["New", "Reading", "Finished"];

const EditBook = () => {
  const { editBooks, editBooksData } = useSelector((state) => state.books);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [message, setMessage] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedStatusNum, setSelectedStatusNum] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editBooksData.status == 0) {
      setSelectedStatus(statuses[0]);
    }
    if (editBooksData.status == 1) {
      setSelectedStatus(statuses[1]);
    }
    if (editBooksData.status == 2) {
      setSelectedStatus(statuses[2]);
    }
  }, [editBooksData]);

  useEffect(() => {
    if (selectedStatus == statuses[0]) {
      setSelectedStatusNum(0);
    }
    if (selectedStatus == statuses[1]) {
      setSelectedStatusNum(1);
    }
    if (selectedStatus == statuses[2]) {
      setSelectedStatusNum(2);
    }
  }, [selectedStatus]);

  const handleChangeStatus = async () => {
    setIsLoading(true);
    const key = localStorage.getItem("key");
    const body = {
      status: selectedStatusNum,
    };
    const sign = generateSign(
      "PATCH",
      body,
      `/books/${editBooksData?.book?.id}`
    );
    try {
      const { data } = await axios.patch(
        `/books/${editBooksData?.book?.id}`,
        body,
        {
          headers: {
            Key: key,
            Sign: sign,
          },
        }
      );
      if (data.isOk == true) {
        dispatch(editBooksClose());
        setIsError(null);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsError(error.response?.data?.message);
      setIsLoading(false);
    }
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(false);
  };

  const handleClose = () => {
    dispatch(editBooksClose());
    setIsError(null);
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
          <FormControl fullWidth noValidate>
            <RadioGroup
              name="statuses"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <FormControlLabel
                checked={selectedStatus == statuses[0]}
                value={statuses[0]}
                control={<Radio />}
                label={statuses[0]}
              />
              <FormControlLabel
                checked={selectedStatus == statuses[1]}
                value={statuses[1]}
                control={<Radio />}
                label={statuses[1]}
              />
              <FormControlLabel
                checked={selectedStatus == statuses[2]}
                value={statuses[2]}
                control={<Radio />}
                label={statuses[2]}
              />
            </RadioGroup>
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
                onClick={handleChangeStatus}
                fullWidth
                loading={isLoading}
              >
                Add
              </LoadingButton>
            </Box>
          </FormControl>
        </Style>
      </Modal>
    </>
  );
};

export default EditBook;
