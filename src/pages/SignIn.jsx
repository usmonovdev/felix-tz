import React from "react";
import { Button, Paper, Typography, TextField } from "@mui/material";
import {
  DividerForUserRegister,
  FormForUserRegister,
  MainTagForUserRegister,
  SpanForUserRegister,
} from "../styled/StyledTags";
import { IconFacebook, IconGoogle } from "../icons";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import axios from "../utils/axios.config";
import {
  loginUserError,
  loginUserStart,
  loginUserSuccess
} from "../store/user-slice";
import md5 from "md5";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(4, "Min length is 4")
        .max(20, "Max lenght is 20"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Min length is 8")
        .max(20, "Max lenght is 20"),
    }),
    onSubmit: async (values, helpers) => {
      dispatch(loginUserStart());
      const method = "GET";
      const key = values.username;
      const secret = values.password;
      const url = "/myself";
      const stringToSign = `${method}${url}${secret}`;
      const sign = md5(stringToSign);
      try {
        const { data } = await axios.get("/myself", {
          headers: {
            Key: key,
            Sign: sign,
          },
        });
        if (data.isOk == true) {
          dispatch(loginUserSuccess(data.data));
          navigate("/");
          helpers.resetForm();
          // window.location.reload()
        }
      } catch (error) {
        dispatch(loginUserError(error.response.data.message));
      }
    },
  });

  return (
    <MainTagForUserRegister>
      <Paper
        sx={{
          width: "430px",
          padding: "35px 28px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography variant="h1" textAlign={"center"}>
          Login
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: "10px" }}
          fullWidth
          startIcon={<IconGoogle />}
        >
          Continue with Google
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<IconFacebook />}
        >
          Continue with FaceBook
        </Button>
        <DividerForUserRegister>OR</DividerForUserRegister>
        <FormForUserRegister noValidate onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            label="Your Username"
            helperText={formik.touched.username && formik.errors.username}
            error={!!(formik.touched.username && formik.errors.username)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
          />
          <TextField
            id="password"
            label="Your Password"
            helperText={formik.touched.password && formik.errors.password}
            error={!!(formik.touched.password && formik.errors.password)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
          />
          {error && (
            <Typography
              variant="caption"
              color={"error.main"}
              textAlign={"center"}
            >
              {error}
            </Typography>
          )}
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            sx={{ marginTop: "20px" }}
          >
            Create Account
          </LoadingButton>
        </FormForUserRegister>
        <Typography textAlign={"center"}>
          Already signed up?{" "}
          <SpanForUserRegister onClick={() => navigate("/auth/register")}>
            Go to Register.
          </SpanForUserRegister>
        </Typography>
      </Paper>
    </MainTagForUserRegister>
  );
};

export default SignIn;
