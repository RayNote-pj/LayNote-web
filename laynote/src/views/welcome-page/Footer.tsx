import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from "./footerStyle";
import { IoLogoGoogle, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube, IoPhonePortraitOutline } from 'react-icons/io5';

function Footer() {
  return (
    <div css = {s.footerContainer}>
      <div css = {s.footerMainDiv}>
        <div css = {s.footerLogoDiv}>
          <img css = {s.footerImgLogo} src="/lay-note-home-image/LayNote_log.PNG" alt="laynote" />
          <img css = {s.footerTextLogo} src="/lay-note-logo/laynote_text_logo.png" alt="laynote" />
        </div>
        <div css = {s.footerPhoneIconDiv}>
            <span css = {s.footerPhoneIcon}>
              <IoPhonePortraitOutline/>
            </span>
            <p css = {s.footerPhoneNumber}>1588-1588</p>
        </div>
        <div>
        <div css = {s.footerLine}></div>
          <ul css = {s.footerIconList}>
            <li css = {s.footerIconLi}><IoLogoInstagram /></li>
            <li css = {s.footerIconLi}><IoLogoYoutube /></li>
            <li css = {s.footerIconLi}><IoLogoTwitter /></li>
            <li css = {s.footerIconLi}><IoLogoGoogle /></li>
          </ul>
        </div>
      <div css = {s.footerNoticDiv}>
          <p css = {s.footerNoticP}>
            평일 AM 09:30 ~ PM 17:00 / 토요일 AM 10:00 ~ PM 15:00
          </p>
          <p css = {s.footerNoticP}>
            점심시간 전화상담가능 · 일요일&공휴일 휴무 · 배송문의 2시 이후
          </p>
      </div>
      </div>
    </div>
  )
}

export default Footer