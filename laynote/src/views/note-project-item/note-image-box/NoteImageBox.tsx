/** @jsxImportSource @emotion/react */
import * as s from "./noteImageBoxStyle";
import React, { useEffect, useState } from "react";
import { NoteImageBoxDto } from "../../../types/dto";
import {
  IMG_PATH,
  MAIN_APT_PATH,
  NOTE_IMAGE_BOX_PATH,
  NOTE_IMG_BOX_CAPTION,
  NOTE_IMG_BOX_DELETE,
  NOTE_IMG_BOX_IMG,
} from "../../../apis/apis";
import { CiImageOff, CiImageOn, CiMenuKebab } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useCompositionStore } from "../../../stores/noteComposition.store";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { TbPhotoUp, TbPhotoX } from "react-icons/tb";

interface NoteProps {
  data: NoteImageBoxDto;
}

function NoteImageBox({ data }: NoteProps) {
  const { noteProjectId } = useParams<{ noteProjectId: string }>();
  const [cookies] = useCookies(["token"]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { fetchNotes } = useCompositionStore();
  const [caption, setCaption] = useState(data.imageCaption ?? "");
  const [ishover, setIsHover] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const updateCaption = async () => {
    try {
      await axios.put(
        `${MAIN_APT_PATH}${NOTE_IMAGE_BOX_PATH}/${noteProjectId}${NOTE_IMG_BOX_CAPTION}/${data.noteImageBoxId}`,
        { imageCaption: caption },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      updateCaption();
    }
  };

  useEffect(() => {
    setCaption(data.imageCaption ?? "");
  }, [data.imageCaption]);

  useEffect(() => {
    if (caption === data.imageCaption) return;

    const timer = setTimeout(() => {
      updateCaption();
    }, 500);

    return () => clearTimeout(timer);
  }, [caption]);

  const updateImg = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("imageUrl", file);

      await axios.post(
        `${MAIN_APT_PATH}${NOTE_IMAGE_BOX_PATH}/${noteProjectId}${NOTE_IMG_BOX_IMG}/${data.noteImageBoxId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
      setPreviewUrl(URL.createObjectURL(file));
      if (!noteProjectId) return;
      fetchNotes(cookies.token, noteProjectId);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNoteImage = async (noteImageBoxId: number) => {
    try {
      await axios.delete(
        `${MAIN_APT_PATH}${NOTE_IMAGE_BOX_PATH}/${noteProjectId}${NOTE_IMG_BOX_DELETE}/${noteImageBoxId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
      if(!noteProjectId) return;
      fetchNotes(cookies.token, noteProjectId);
    } catch (error) {
      console.error(error);
    }
  };

  const modalHandler = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <div
      css={s.noteImgBox}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setIsModal(false);
      }}
    >
      <div css={s.imgBoxDivDiv}>
        <div>
          {data.imageUrl ? (
            <>
              <img
                css={s.noteimage}
                src={previewUrl ?? `${IMG_PATH}/${data.imageUrl}`}
                alt=""
              />
            </>
          ) : (
            <>
              <CiImageOff size={50} color="gray" />
            </>
          )}
          {ishover && (
            <div css={s.imgBtn} onClick={modalHandler}>
              <CiMenuKebab />
            </div>
          )}
          {isModal && (
            <div css={s.modal}>
              <label
                css={s.changeImgBtn}
                htmlFor={`note-box-image-${data.noteImageBoxId}`}
              >
                <TbPhotoUp /> 변경
              </label>
              <div css={s.line}></div>
              <span css={s.noteImgBoxDeleteBtn} onClick={() => deleteNoteImage(data.noteImageBoxId)}><TbPhotoX /> 삭제</span>
            </div>
          )}
        </div>
      </div>
      <input
        id={`note-box-image-${data.noteImageBoxId}`}
        type="file"
        hidden
        onChange={(e) => {
          if (!e.target.files) return;
          updateImg(e.target.files[0]);
          e.target.value = "";
        }}
      />
      <input
        css={s.caption}
        placeholder="caption..."
        type="text"
        name="imageCaption"
        onChange={(e) => setCaption(e.target.value)}
        onKeyDown={handleKeyDown}
        value={caption}
      />
    </div>
  );
}

export default NoteImageBox;
