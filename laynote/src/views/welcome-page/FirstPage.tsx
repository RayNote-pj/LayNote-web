import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from "./welcomePageStyle";
import { useNavigate } from 'react-router-dom';

function FirstPage() {
  const navigator = useNavigate();

  return (
    <div css={s.welcomPageBackground}>
      <div css={s.firstPageBackground}>
        <div css={s.firstPageDiv1}>
          <div css = {s.firstPageSpanBtnDiv}>
            <span css = {s.firstPageDivSpan}>
              "혼자서도, 함께여도 <br />
              생각의 시작은 LAYNOTE."
            </span>
            <div css = {s.firstPageBtnDiv}>
              <button onClick={() => navigator("/login")} css = {s.firstPageLoginSignBtn}>Login</button>
              <button onClick={() => navigator("/sign-up")} css = {s.firstPageLoginSignBtn}>SignUp</button>
            </div>
          </div>
          <div css = {s.firstPageLineSpanDiv}>
          <div css = {s.firstPageLine}></div>
            <blockquote css = {s.firstPageSpan}>
              아이디어를 나누고 정리하는 가장 직관적인 방법.
              <br />
              보드 하나로 팀 전체의 생각을 연결.
            </blockquote>
          </div>
        </div>
        <div css = {s.firstPageImgDiv}>
          <img
            css={s.firstPageImg1}
            src="/lay-note-home-image/화면 캡처 2025-12-05 024046.png"
            alt=""
          />
          <img
            css={s.firstPageImg2}
            src="/lay-note-home-image/화면 캡처 2025-12-05 024008.png"
            alt=""
          />
        </div>
    </div>
      </div>
  );
}

export default FirstPage