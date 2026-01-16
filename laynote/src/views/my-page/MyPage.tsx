import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from "./myPageStyle";
import { User } from '../../types';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { MAIN_APT_PATH, USER_INFO, USER_PATH } from '../../apis/apis';

function MyPage() {
  const [cookies] = useCookies(["token"]);
  const [userData, setUserData] = useState<User | null>(null);

  const userInfo = async() => {
    if (!cookies.token) return;
    try {
      const response = await axios.get(`${MAIN_APT_PATH}${USER_PATH}${USER_INFO}`)
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>

    </div>
  )
}

export default MyPage