import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from "./welcomePageStyle";

function ThirdPage() {
  return (
    <div css = {s.thirdPageContainer}>
      <div css = {s.thirdPageDiv}>
      <img css = {s.thirdPageImg} src="/lay-note-home-image/화면 캡처 2025-12-05 023652.png" alt="" />
      <span css = {s.thirdPageSpan}>Organizing notes with your team members.</span>
      </div>
    </div>
  )
}

export default ThirdPage