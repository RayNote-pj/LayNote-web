import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./signUpStyle";
import { User } from "../../types";
import axios from "axios";
import { AUTH_PATH, DUPLICATE, MAIN_APT_PATH, SIGN_UP } from "../../apis/apis";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;
const nameRegex = /^[A-Za-z가-힣]{2,16}$/;
const nickNameRegex = /^[A-Za-z가-힣0-9._]{2,14}$/;
const phoneRegex = /^010\d{8}$/;

function SignUp() {
  const navigate = useNavigate();
  const [isNext, setIsNext] = useState<boolean>(true);
  const [isPage, setIsPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [duplicateUserEmail, setDuplicateUserEmail] = useState<boolean>(false);
  const [duplicateNickName, setDuplicateNickName] = useState<boolean>(false);
  const [duplicateUserEmailMg, setDuplicateUserEmailMg] = useState<string>("");
  const [duplicateNickNameMg, setDuplicateNickNameMg] = useState<string>("");
  const [validUserEmail, setValidUserEmail] = useState<string>("");
  const [validUsername, setValidUsername] = useState<string>("");
  const [validPassword, setValidPassword] = useState<string>("");
  const [matchPassword, setMatchPassword] = useState<string>("");
  const [validNickName, setValidNickName] = useState<string>("");
  const [validUserPhone, setValidUserPhone] = useState<string>("");
  const [signUpData, setSignUpData] = useState<User>({
    userId: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
    userName: "",
    userPhone: "",
    profileImageUrl: "",
    joinPath: "",
    snsId: null,
    nickName: "",
  });

  const clickNextPage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("페이지 이동");

    let valid = true;
    if (!emailRegex.test(signUpData.userEmail) || !signUpData.userEmail) {
      valid = false;
      setValidUserEmail("형식에 맞이 않는 이메일입니다.");
    }
    if (!passwordRegex.test(signUpData.password) || !signUpData.password) {
      valid = false;
      setValidPassword("영문/특수문자포함, 8자~16자");
    }   
    if (signUpData.password !== signUpData.confirmPassword) {
      valid = false; 
      setMatchPassword("비밀번호가 일치하지 않습니다.")
    }
    if (!valid) {
      console.log("유효성 검사 실패");
      return;
    }

    setIsNext(!isNext);
    setIsPage(!isPage);
  };

  const fetchData = async() => {
    setLoading(true);
    try {
      await axios.post(
        `${MAIN_APT_PATH}${AUTH_PATH}${SIGN_UP}`,
        {
          ...signUpData
        }, 
        {
          headers: {
            "Content-Type": "application/json",

          }
        }
      );
      alert("회원가입 완료");
      navigate("/login");
    } catch (error) {
      console.error("회원가입");
    }
  }

  const handelDulicateNickName = async() => {
    try {
      const response = await axios(`${MAIN_APT_PATH}${AUTH_PATH}${DUPLICATE}/${signUpData.nickName}`)
      setDuplicateNickName(response.data.data);
      if(duplicateNickName) {
        setDuplicateNickNameMg("사용중인 이메일입니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handelDulicateUserEmail = async(e:React.KeyboardEvent<HTMLInputElement>) => {
    try {
      const response = await axios(`${MAIN_APT_PATH}${AUTH_PATH}${DUPLICATE}/${signUpData.userEmail}`)
      setDuplicateUserEmail(response.data.data);
      if(duplicateUserEmail) {
        setDuplicateUserEmailMg("사용중인 이메일입니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }



  const handleSubmit = (e: React.FormEvent) => {
    let valid = true;
    if (!nameRegex.test(signUpData.userName) || !signUpData.userName) {
      valid = false;
      setValidUsername("영문/한글, 2자~16자");
    }
    if (!nickNameRegex.test(signUpData.nickName) || !signUpData.nickName) {
      valid = false;
      setValidNickName("영문/한글/숫자/-, _, . 허용, 2자~14자");
    }
    if (!phoneRegex.test(signUpData.userPhone) || !signUpData.userPhone) {
      valid = false;
      setValidUserPhone("형식에 맞이 않는 휴대폰 번호입니다.");
    }
    fetchData();
  }

  const pageCircleStyle1 = () => ({
    backgroundColor: isPage ? "#c5c5c5ff" : "#A4B2C2",
  });
  const pageCircleStyle2 = () => ({
    backgroundColor: isPage ? "#A4B2C2" : "#c5c5c5ff",
  });

  const userDataForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "userEmail") {
      setDuplicateUserEmailMg("");
    } else if (name === "userNickName") {
      setDuplicateNickNameMg("");
    }
  };

  return (
    <div css={s.signUpBackground}>
      <div css={s.signUpContainer}>
        <div css={s.signUpLogoTextDiv}>
          <div css={s.signUpLogoDiv}>
            <img
              css={s.signUpImgLogo}
              src="/lay-note-logo/laynote_image_logo.png"
              alt="laynote"
            />
            <img
              css={s.signUpTextLogo}
              src="/lay-note-logo/laynote_text_logo.png"
              alt="laynote"
            />
          </div>
          <span css={s.signUpTextSpan}>SIGN UP</span>
        </div>
        <div css={s.signUpLevelDiv}>
          <div style={pageCircleStyle1()} css={s.signUpLevelCircle}>
            <span css={s.signUpLevelCircleSpan}>1</span>
          </div>
          <div css={s.signUpLevelLine}></div>
          <div style={pageCircleStyle2()} css={s.signUpLevelCircle}>
            <span css={s.signUpLevelCircleSpan}>2</span>
          </div>
        </div>
        {isNext ? (
          <>
            <div css={s.signUpFeildInputContainer}>
              <div css={s.signUpFeildDiv}>
                <label htmlFor="userEmail" css={s.signUpFeildSpan}>Email adress. <span>{validUserEmail}</span></label>
                <input css={s.signUpFeildInput} type="text" onChange={userDataForm} onKeyDown={handelDulicateUserEmail} name="userEmail" value={signUpData.userEmail} />
              </div>
              <div css={s.signUpFeildDiv}>
                <label htmlFor="passowrd" css={s.signUpFeildSpan}>Password.  <span>{validPassword}</span></label>
                <input css={s.signUpFeildInput} type="password" onChange={userDataForm} name="password" value={signUpData.password}/>
              </div>
              <div css={s.signUpFeildDiv}>
                <label htmlFor="confirmPassword" css={s.signUpFeildSpan}>Check Password. <span>{matchPassword}</span></label>
                <input css={s.signUpFeildInput} type="password" onChange={userDataForm} name="confirmPassword" value={signUpData.confirmPassword}/>
              </div>
            </div>
            <div css={s.signUpNextBtnDiv}>
              <button css={s.signUpNextBtn} onClick={clickNextPage}>
                NEXT
              </button>
            </div>
          </>
        ) : (
          <>
            <div css={s.signUpFeildInputContainer2}>
              <div css={s.signUpProfileImgDiv}>
                <img
                  css={s.signUpProfileImg}
                  src="/lay-note-logo/laynote_image_logo.png"
                  alt=""
                />
              </div>
              <div css={s.signUpFeildDiv}>
                <label htmlFor="userName" css={s.signUpFeildSpan}>Name.</label>
                <input css={s.signUpFeildInput} type="text" onChange={userDataForm} name="userName" value={signUpData.userName}/>
              </div>
              <div css={s.signUpFeildDiv}>
                <label htmlFor="nickName" css={s.signUpFeildSpan}>NickName.</label>
                <input css={s.signUpFeildInput} type="text" onChange={userDataForm} name="nickName" value={signUpData.nickName}/>
              </div>
              <div css={s.signUpFeildDiv}>
                <label htmlFor="userPhone" css={s.signUpFeildSpan}>Phone.</label>
                <input css={s.signUpFeildInput} type="text" onChange={userDataForm} name="userPhone" value={signUpData.userPhone}/>
              </div>
            </div>
            <button onClick={handleSubmit} css={s.signUpBtn}>Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp;
