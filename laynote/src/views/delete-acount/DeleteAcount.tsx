/** @jsxImportSource @emotion/react */
import axios from "axios";
import * as s from "./deleteAcountStyle";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { MAIN_APT_PATH, USER_DELETE, USER_PATH } from "../../apis/apis";
import useAuthStore from "../../stores/user.store";

function DeleteAcount() {
  const [cookies, removeCookie] =useCookies(["token"]);
  const { logout } = useAuthStore();
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const deleteAcount = async() => {
    try {
      const res = await axios.delete(`${MAIN_APT_PATH}${USER_PATH}${USER_DELETE}`,
        {
          data: {password},
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }, withCredentials: true
      });

    if (!res.data?.result) {
      alert(res.data?.message ?? "탈퇴에 실패했습니다.");
      return;
    }
    removeCookie("token", { path: "/" });
    logout();
    navigate("/");
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div css={s.userInfoBackground}>
      <div css={s.userInfoContainer}>
        <div css={s.logoContainer}>
          <div css={s.logoDiv}>
            <img
              css={s.imgLogo}
              src="/lay-note-logo/laynote_image_logo.png"
              alt="laynote"
            />
            <img
              css={s.textLogo}
              src="/lay-note-logo/laynote_text_logo.png"
              alt="laynote"
            />
          </div>
          <span css={s.pageName}>Delete Acount</span>
        </div>
        <div css={s.deleteBox}>
          <div css={s.passwordDiv}>
            <label css={s.passwordLavel}>Password.</label>
            <input css={s.passwordInput} type="password" name="password" value={password} onChange={passwordChange} />
          </div>
          <div> 
            <span css={s.noticSpan}>탈퇴시 유의 사항.</span>
            <div css={s.noticDiv}>
            <ul css={s.noticList}>
              <li>탈퇴 후 계정 복구는 불가능합니다.</li>
              <li>개인정보는 관련 법령에 따라 처리됩니다.</li>
              <li>작성한 콘텐츠는 삭제됩니다.</li>
              <li>탈퇴 시 모든 서비스 이용이 즉시 종료됩니다.</li>
              <li>저장된 데이터는 모두 삭제되며 복구할 수 없습니다.</li>
            </ul>
            </div>
          </div>
        </div>
        <div css={s.cancelDeleteBtnDiv}>
          <button css={s.cancelBtn} onClick={()=>navigate(-1)}>CANCEL</button>
          <button css={s.deleteBtn} onClick={deleteAcount}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAcount;
