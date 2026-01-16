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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchData = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e instanceof KeyboardEvent && e.key !== "Enter") return;
    e.preventDefault();
    if (!loginForm.userEmail.trim() || !emailRegex.test(loginForm.userEmail)) {
      setErrorMessage("형식에 맞이 않는 이메일주소.");
      return;
    }
    if (!loginForm.password.trim() || !passwordRegex.test(loginForm.password)) {
      setErrorMessage("영문, 숫자, 특수기호 포함. 8~16자");
      return;
    }

    try {
      const response = await axios.post(`${MAIN_APT_PATH}${AUTH_PATH}${LOGIN}`, loginForm);
      setErrorMessage(null);
      logInSuccessResponse(response.data.data);
      navigate("/");
      alert("로그인 성공");
    } catch (error) {
      setErrorMessage("❌ 아이디 혹은 비밀번호가 잘못되었습니다.");
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
                Email adress
              </label>
              <input
                css={s.loginFeildInput}
                type="text"
                onChange={changeInput}
                name="userEmail"
                value={loginForm.userEmail}
              />
            </div>
            <div css={s.loginFeildDiv}>
              <label htmlFor="password" css={s.loginFeildSpan}>
                Password
              </label>
              <input
                css={s.loginFeildInput}
                type="password"
                onChange={changeInput}
                name="password"
                value={loginForm.password}
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
            onKeyDown={fetchData}
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
