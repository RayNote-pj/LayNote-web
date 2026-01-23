/** @jsxImportSource @emotion/react */
import * as s from "./noteDetailStyle";
import React, { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  COMPOSITION_GET,
  MAIN_APT_PATH,
  NOTE_PROJECT_COMPOSITION_PATH,
} from "../../apis/apis";
import { useCookies } from "react-cookie";
import { NoteComponentType, NoteComposition } from "../../types/dto";
import NoteBox from "../note-project-item/note-box/NoteBox";
import NoteList from "../note-project-item/note-list/NoteList";
import NoteImageBox from "../note-project-item/note-image-box/NoteImageBox";

function NoteProjectDetail() {
  const { noteProjectId } = useParams<{ noteProjectId: string }>();

  const [cookies] = useCookies(["token"]);
  const [noteData, setNoteData] = useState<NoteComposition[]>([]);
  const navigator = useNavigate();

  useEffect(() => {
    if (!noteProjectId) {
      navigator("-1");
      return;
    }
    getNoteProjectComposition();
  }, [noteProjectId]);

  const getNoteProjectComposition = async () => {
    try {
      const response = await axios.get(
        `${MAIN_APT_PATH}${NOTE_PROJECT_COMPOSITION_PATH}/${noteProjectId}${COMPOSITION_GET}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
      setNoteData(response.data.data ?? []);
    } catch (error) {
      console.error(error);
      setNoteData([]);
    }
  };

  const renderComponentByType = (composition: NoteComposition) => {
    console.log(
      "type from server:",
      composition.noteComponentType,
      "NOTEBOX enum:",
      NoteComponentType.NOTEBOX,
    );
    switch (composition.noteComponentType) {
      case NoteComponentType.NOTEBOX:
        return (
          <NoteBox
            key={composition.noteCompositionId}
            noteCompositionId={composition.noteCompositionId}
            data={composition}
          />
        );
      case NoteComponentType.NOTEIMAGEBOX:
        return (
          <NoteImageBox
            key={composition.noteCompositionId}
            noteCompositionId={composition.noteCompositionId}
            data={composition}
          />
        );

      case NoteComponentType.NOTELIST:
        return (
          <NoteList
            key={composition.noteCompositionId}
            noteCompositionId={composition.noteCompositionId}
            data={composition}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div css={s.workSpaceBackground}>
      {noteData.map((composition) => renderComponentByType(composition))}
    </div>
  );
}

export default NoteProjectDetail;
