import { css } from "@emotion/react";
export const barContainer = css`
  width: 90px;
  overflow: hidden;
  height: 100%;  
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid #cccccc;
  padding: 2px;
  box-sizing: border-box;
`
export const noteProjectDetailBarLine = css`
  width: 300px;
  border: 1px solid #ccc;
  margin: 5px auto;
`
export const imgTitleDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`
export const noteProjectImgDiv = css`
  width: 50px;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  border-radius: 3px;
`
export const noteProjectImg = css`
  width: 110%;
`
export const projectTitleSpan = css`
  font-size: 11px;
  font-family: 'ChangwonDangamRounded';
`
export const noteItemCreateBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 50px;
  height: 50px;
  font-size: 25px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #777777;
  transition: transform 0.5s ease;
  :hover {
    cursor: pointer;
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`
export const noteItemCreateBtnDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px;
  box-sizing: border-box;
`