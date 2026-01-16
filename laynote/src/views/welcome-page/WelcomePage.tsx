import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./welcomePageStyle";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";

function WelcomePage() {
  return (
    <div css={s.welcomPageBackground}>
      <FirstPage />
      <SecondPage />
      <ThirdPage />
      <Footer />
    </div>
  );
}

export default WelcomePage;
