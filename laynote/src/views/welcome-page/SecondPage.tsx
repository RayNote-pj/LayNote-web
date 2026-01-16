import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./welcomePageStyle"

function SecondPage() {
  return (
    <div css = {s.secondPageBackground}>
    <div css = {s.secondPageLogoDivContainer}>
      <div css = {s.secondPageLogoDiv}>
        <img css = {s.secondPageImgLogo} src="/lay-note-home-image/LayNote_log.PNG" alt="laynote" />
        <img css = {s.secondPageTextLogo} src="/lay-note-logo/laynote_text_logo.png" alt="laynote" />
      </div>
      <div css = {s.secondPageContainer}>
        <div css = {s.secondPageDiv1}>
          <div css = {s.secondPageDiv1Div}>
            <div>
              <div css = {s.secondPageDiv1DivDiv1}>
                <p css = {s.secondPageDiv1DivDiv1P}>
                  아이디어를 나누고 정리하는 가장 직관적인 방법.
                  <br /> 보드 하나로 팀 전체의 생각을 연결.
                </p>
              </div>
            </div>
            <div css = {s.secondPageDiv1DivDiv2}>
              <span>“혼자서도, 함께여도
              <br />생각의 시작은 LAYNOTE.”</span>
            </div>
          </div>
        </div>
        <div css = {s.secondPageDiv2}>
          <img css = {s.secondPageDiv2Img} src="/lay-note-home-image/화면 캡처 2025-12-05 023936.png" alt="" />
          <div css = {s.secondPageDiv2Div}>
            <span>
              아이디어를 나누고 정리하는 가장 직관적인 방법.
              <br />
              보드 하나로 팀 전체의 생각을 연결.
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SecondPage;
