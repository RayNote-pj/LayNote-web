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
        const decodeToken: TokenUser = jwtDecode<TokenUser>(cookies.token);
        login(decodeToken.userEmail);
      } catch (e) {
        console.error("Invalid Token",e);
        logout();
      }
    } else {
      logout();
    }
  }, [cookies.token, login, logout]);

  return (
      <RootLayout>
        <InformationBar />
        <RootContainer>
            {isAuthenticated ? 
            <>
              <SidebarSwitcher />
              <MainContainer>
                <Routes>
                  <Route path="/" element={<NoteProjectList/>} />
                  <Route path="/trash" element={<TrashNote/>} />
                  <Route path="/my-page" element={<MyPage/>} />
                  <Route path="/note/:noteProjectId" element={<NoteProjectDetail/>}/>
                </Routes>
              </MainContainer>
            </>
            :
            <MainContainer>
                <Routes>
                  <Route path="/" element={<WelcomePage/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </MainContainer>
            }
        </RootContainer>
      </RootLayout>
  );
}

export default App;
