import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./loginStyle";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AUTH_PATH, LOGIN, MAIN_APT_PATH } from "../../apis/apis";
import axios from "axios";
import { LoginResponsedto } from "../../types/dto";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    userEmail: "",
    password: "",
  });
  const [, setCookies] = useCookies(["token"]);
  const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string | null>(null);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    fetchData();
  }
};


  const fetchData = async () => {
      let hasError = false;

  if (!loginForm.userEmail.trim() || !emailRegex.test(loginForm.userEmail)) {
    setErrorEmailMessage("형식에 맞지 않는 이메일주소.");
    hasError = true;
  } else {
    setErrorEmailMessage(null);
  }

  if (!loginForm.password.trim() || !passwordRegex.test(loginForm.password)) {
    setErrorPasswordMessage("영문, 숫자, 특수기호 포함. 8~16자");
    hasError = true;
  } else {
    setErrorPasswordMessage(null);
  }

  if (hasError) return;

    try {
      const response = await axios.post(`${MAIN_APT_PATH}${AUTH_PATH}${LOGIN}`, loginForm);
      setErrorEmailMessage(null);
      setErrorPasswordMessage(null);
      logInSuccessResponse(response.data.data);
      navigate("/");
      alert("로그인 성공");
    } catch (error) {
      console.error(error);
    }
  };

  const setToken = (token: string, exprTime: number) => {
    const expires = new Date(Date.now() + exprTime);
    setCookies("token", token, {
      path: "/",
      expires,
    });
  };

  const logInSuccessResponse = (data: LoginResponsedto) => {
    if (data) {
      const { token, exprTime } = data;
      setToken(token, exprTime);
    }
  };

  return (
    <div css={s.loginBackground}>
      <div css={s.loginContainer}>
        <div css={s.loginLogoTextDiv}>
          <div css={s.loginLogoDiv}>
            <img
              css={s.loginImgLogo}
              src="/lay-note-logo/laynote_image_logo.png"
              alt="laynote"
            />
            <img
              css={s.loginTextLogo}
              src="/lay-note-logo/laynote_text_logo.png"
              alt="laynote"
            />
          </div>
          <span css={s.loginTextSpan}>LOGIN</span>
        </div>
          <div css={s.loginFeildInputContainer}>
            <div css={s.loginFeildDiv}>
              <label htmlFor="userEmail" css={s.loginFeildSpan}>
                Email.  {errorEmailMessage}
              </label>
              <input
                css={s.loginFeildInput}
                type="email"
                onChange={changeInput}
                name="userEmail"
                value={loginForm.userEmail}
                onKeyDown={onKeyDownEnter}
              />
            </div>
            <div css={s.loginFeildDiv}>
              <label htmlFor="password" css={s.loginFeildSpan}>
                Password. <span>{errorPasswordMessage}</span> 
              </label>
              <input
                css={s.loginFeildInput}
                type="password"
                onChange={changeInput}
                name="password"
                value={loginForm.password}
                onKeyDown={onKeyDownEnter}
              />
              <div css={s.loginFindBtn}>
                <span>아이디 찾기</span>
                <span>/</span>
                <span>비밀번호 찾기</span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={fetchData}
            css={s.loginBtn}
          >
            Login
          </button>
        <div css={s.loginAuthDiv}>
          <button css={s.loginAuthBtn}>카카오</button>
          <button css={s.loginAuthBtn}>네이버</button>
        </div>
        <button onClick={() => navigate("/sign-up")} css={s.moveSignUpBtn}>
          Sign Up now
        </button>
      </div>
    </div>
  );
}

export default Login;
