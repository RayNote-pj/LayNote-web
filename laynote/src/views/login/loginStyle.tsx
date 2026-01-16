import { css } from "@emotion/react";

export const loginBackground = css`
  background-color: #919191ff;
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const loginContainer = css`
  width: 400px;
  height: 550px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const loginLogoDiv = css`
  width: 185px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 40px;
`
export const loginImgLogo = css`
  width: 35px;
`
export const loginTextLogo = css`
  height: 21px;
`
export const loginTextSpan = css`
  color: #6C7A89;
  font-size: 23px;
  font-weight: 700;
`
export const loginLogoTextDiv = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`
export const loginFeildDiv = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
export const loginFeildSpan = css`
  font-size: 12px;
`
export const loginFeildInput = css`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #333;
  padding: 10px;
  box-sizing: border-box;
`
export const loginFeildInputContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  height: 140px;
  align-items: center;
  margin: 10px auto;
  margin-bottom: 40px;
`
export const loginFindBtn = css`
  font-size: 10px;
  margin-left: 5px;
`
export const loginBtn = css`
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #A4B2C2;
  color: white;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 30px;
  :hover {
    cursor: pointer;
    background-color: #6C7A89;
  }
`
export const loginAuthDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 100px;
  margin-bottom: 30px;
`
export const loginAuthBtn = css`
  width: 300px;
  height: 40px;
`
export const moveSignUpBtn = css`
  border: none;
  background-color: rgba(0,0,0,0);
  color: red;
  font-weight: 700;
`