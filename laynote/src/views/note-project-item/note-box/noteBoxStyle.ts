import { css } from "@emotion/react";

export const noteBoxContainer = css`
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 7px;
  border: 1px solid #c0c0c0;
  position: absolute;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const closeDiv = css`
  width: 100%;
  text-align: right;
  font-size: 17px;
`
export const titleInput = css`
  border: none;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  padding: 5px 10px;
  box-sizing: border-box;
  outline: none;
  transition: border 0.5s ease;
  :focus, :hover {
    border-bottom: 2px solid #333;
  }
`
export const noteBoxImgDiv = css`
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 1px solid #eee;
  border-radius: px;
`
export const textareaBox = css`
  width: 100%;
  margin-top: 10px;
  border: 1px solid #eee;
  height: 23%;
  font-size: 13px;
  padding: 10px;
  box-sizing: border-box;
  font-family: 'YesMyungjo';
  resize: none;
  outline: none;
`
export const line = css`
  border: 1px solid #cfcfcf;
  width: 100%;
  margin-top: 10px;
`