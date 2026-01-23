import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./InformationModalStyle";
import { useCookies } from "react-cookie";
import { User } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IMG_PATH, MAIN_APT_PATH, USER_INFO, USER_PATH } from "../../apis/apis";
import userAuthStore from "../../stores/user.store";
import { CiUser } from "react-icons/ci";

function InformationModal() {
  const { logout } = userAuthStore();
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const [data, setData] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLougoutClick = () => {
    setCookies("token", "", { expires: new Date() });
    removeCookie("token", { path: "/" });
    logout();
    navigate("/");
  };

  const fetchData = async () => {
    if (!cookies.token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }

    try {
      const response = await axios.get(
        `${MAIN_APT_PATH}${USER_PATH}${USER_INFO}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
      setData(response.data.data);
    } catch (error) {
      console.error("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div css={s.informationModalContianer}>
      <div css={s.informationModalInfoBox}>
        <div css={s.informationModalinfoDiv}>
          <span css={s.informationModalNickNameSpan}>{data?.nickName}</span>
          <span css={s.informationModalEmailSpan}>{data?.userEmail}</span>
        </div>
        <div css={s.informationModalBtnDiv}>
          <button css={s.informationModalBtn} onClick={handleLougoutClick}>
            logout
          </button>
          <button
            css={s.informationModalMypageBtn}
            onClick={() => navigate("/my-page")}
          >
            mypage
          </button>
        </div>
      </div>
      <div css={s.informationModlaImgDiv}>
        {data?.profileImageUrl ? (
          <img
            css={s.infoImg}
            src={`${IMG_PATH}/${data?.profileImageUrl}`}
            alt="a"
          />
        ) : (
          <CiUser />
        )}
      </div>
    </div>
  );
}

export default InformationModal;
