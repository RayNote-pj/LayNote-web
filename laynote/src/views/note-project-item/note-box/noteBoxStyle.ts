import { css } from "@emotion/react";

export const noteBoxContainer = css`
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid #c0c0c0;
  position: absolute;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  width: 280px;
  height: 360px;
  cursor:move;
  resize: horizontal;
`;
export const closeDiv = css`
  width: 100%;
  text-align: right;
  font-size: 17px;
  height: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const titleInput = css`
  border: none;
  border-bottom: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  padding: 5px 10px;
  box-sizing: border-box;
  outline: none;
  transition: border 0.5s ease;
  :focus,
  :hover {
    border-bottom: 2px solid #333;
  }
`;
export const noteBoxImgDiv = css`
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 170px;
  border: 1px solid #b4b4b4;
  border-radius: 1px;
  overflow: hidden;
  position: relative;
`;
export const imgBtn = css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 25px;
    background-color: rgba(112, 112, 112, 0.5);
    width: 30px;
    height: 30px;
    border-radius: 5px;
    top: 135px;
    right: 5px;
    font-weight: 900;
    color: #fafafa;
    :hover {
      cursor: pointer;
    }
`;
export const textareaBox = css`
  width: 100%;
  margin-top: 10px;
  border: 1px solid #eee;
  height: 35%;
  font-size: 13px;
  padding: 10px;
  box-sizing: border-box;
  font-family: "YesMyungjo";
  resize: none;
  outline: none;
`;
export const line = css`
  border: 1px solid #cfcfcf;
  width: 100%;
  margin-top: 10px;
`;
