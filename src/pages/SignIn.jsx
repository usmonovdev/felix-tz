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
import { registerUserError, registerUserStart, registerUserSuccess } from "../store/user-slice";

const SignIn = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Min length is 3")
        .max(20, "Max length is 20"),
      email: Yup.string().required("Email is required").email("Invalid Email"),
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
      dispatch(registerUserStart())
      try {
        const { data } = await axios.post("/signup", {
          name: values.name,
          email: values.email,
          key: values.username,
          secret: values.password
        });
        if (data.isOk == true) {
          dispatch(registerUserSuccess(data))
          localStorage.setItem("isLoggedIn", true)
          navigate('/')
        }
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        dispatch(registerUserError())
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
          Sign In
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
            id="name"
            label="Your Name"
            helperText={formik.touched.name && formik.errors.name}
            error={!!(formik.touched.name && formik.errors.name)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
          />
          <TextField
            id="email"
            label="Your Email"
            helperText={formik.touched.email && formik.errors.email}
            error={!!(formik.touched.email && formik.errors.email)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
          />
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
            Go to register
          </SpanForUserRegister>
        </Typography>
      </Paper>
    </MainTagForUserRegister>
  );
};

export default SignIn;
