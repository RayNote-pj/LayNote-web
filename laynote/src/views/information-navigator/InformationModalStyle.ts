import { css } from "@emotion/react";

export const informationModalContianer = css`
  background-color: #fdfdfdff;
  width: 270px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 5vh;
  z-index: 10;
  border-top: 2px solid #919191ff;
  padding: 15px 35px;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 0.01px #e2e2e2ff;
`
export const informationModalInfoBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const informationModalinfoDiv = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`
export const informationModalNickNameSpan = css`
  font-size: 12px;
` 
export const informationModalEmailSpan = css`
  font-size: 7px;
  padding-left: 2px;
` 
export const informationModalBtnDiv = css`
  display: flex;
  justify-content: space-between;
  width: 100px;
`
export const informationModalBtn = css`
  border: none;
  color: red;
  font-size: 10px;
  background-color: rgba(0,0,0,0);
` 
export const informationModalMypageBtn = css`
  border: none;
  font-size: 10px;
  background-color: rgba(0,0,0,0);
` 
export const informationModlaImgDiv = css`
  border: 2px solid #eee;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`