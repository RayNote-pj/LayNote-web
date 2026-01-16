import React, { useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from "./InformationModalStyle";
import { useCookies } from 'react-cookie';
import { User } from '../../types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MAIN_APT_PATH, USER_INFO, USER_PATH } from '../../apis/apis';

function InformationModal() {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const [data, setData] = useState<User|null>(null);
  const navigate = useNavigate();
  
  const fetchData = async() => {
    if (!cookies.token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }

    try {
      const response = await axios.get(`${MAIN_APT_PATH}${USER_PATH}${USER_INFO}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      )
      setData(response.data.data);
    } catch (error) {
      console.error("error");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div css={s.informationModalContianer}>
      <div css={s.informationModalInfoBox}>
      <div css={s.informationModalinfoDiv}>
      <span css={s.informationModalNickNameSpan}>{data?.nickName}0000000000</span>
      <span css={s.informationModalEmailSpan}>{data?.userEmail}</span>
      </div>
      <div css={s.informationModalBtnDiv}>
        <button css={s.informationModalBtn}>logout</button>
        <button css={s.informationModalMypageBtn}>mypage</button>
      </div>
      </div>
      <div css={s.informationModlaImgDiv}>
        <img src="//" alt="a" />
      </div>
    </div>
  )
}

export default InformationModal