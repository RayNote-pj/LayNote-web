import React, { useEffect, useState } from "react";
import "./App.css";
import RootLayout from "./views/roote-layout/RootLayout";
import RootContainer from "./views/root-container/RootContainer";
import InformationBar from "./views/information-navigator/InformationBar";
import NoteProjectBar from "./views/bars/NoteProjectBar";
import MainContainer from "./views/main-container/MainContainer";
import WelcomePage from "./views/welcome-page/WelcomePage";
import { useCookies } from "react-cookie";
import userAuthStore from "./stores/user.store";
import { jwtDecode } from "jwt-decode";
import { Route, Routes, useParams } from "react-router-dom";
import Login from "./views/login/Login";
import SignUp from "./views/signup/SignUp";
import NoteProjectList from "./views/note-project/NoteProjectList";
import TrashNote from "./views/trash/TrashNote";
import MyPage from "./views/my-page/UserInfoPage";
import NoteProjectDetail from "./views/note-project/NoteProjectDetail";
import SidebarSwitcher from "./views/bars/SidebarSwitcher";
import RequireAuth from "./public-only/RequireAuth";
import PublicOnly from "./public-only/PublicOnly";
import HomeRouter from "./home-router/HomeRouter";
import DeleteAcount from "./views/delete-acount/DeleteAcount";
import NoteProjectDetailORJoIn from "./views/note-project/NoteProjectDetailORJoIn";

function App() {
  interface TokenUser {
    userEmail: string;
  }
  const [cookies] = useCookies(["token"]);
  const {isAuthenticated } = userAuthStore();
  const { login, logout } = userAuthStore();

useEffect(() => {
  if (cookies.token) {
    try {
      const decodeToken = jwtDecode<TokenUser>(cookies.token);
      login(decodeToken.userEmail);
    } catch {
      logout();
    }
  } else {
    logout();
  }
}, [cookies.token]);

useEffect(() => {
  userAuthStore.getState().restoreAuth();
}, []);


  return (
    <RootLayout>
      <InformationBar />
      <RootContainer>
        <SidebarSwitcher />

        <MainContainer>
          <Routes>
            {/* 홈 */}
            <Route path="/" element={<HomeRouter />} />

            {/* public */}
            <Route
              path="/login"
              element={
                <PublicOnly>
                  <Login />
                </PublicOnly>
              }
            />

            <Route
              path="/sign-up"
              element={
                <PublicOnly>
                  <SignUp />
                </PublicOnly>
              }
            />

            {/* auth required */}
            <Route
              path="/note/:noteProjectId"
              element={
                <RequireAuth>
                  <NoteProjectDetailORJoIn />
                </RequireAuth>
              }
            />

            <Route
              path="/trash"
              element={
                <RequireAuth>
                  <TrashNote />
                </RequireAuth>
              }
            />

            <Route
              path="/my-page"
              element={
                <RequireAuth>
                  <MyPage />
                </RequireAuth>
              }
            />
            
            <Route
              path="/my-page/delete-acount"
              element={
                <RequireAuth>
                  <DeleteAcount />
                </RequireAuth>
              }
            />
          </Routes>
        </MainContainer>
      </RootContainer>
    </RootLayout>
  );
}

export default App;
