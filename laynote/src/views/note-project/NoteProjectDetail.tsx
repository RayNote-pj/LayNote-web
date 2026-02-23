/** @jsxImportSource @emotion/react */
import * as s from "./noteDetailStyle";
import React, { useEffect, useRef, useState } from "react";
import { NoteComponentType, NoteComposition } from "../../types/dto";
import NoteBox from "../note-project-item/note-box/NoteBox";
import NoteList from "../note-project-item/note-list/NoteList";
import NoteImageList from "../note-project-item/note-image-box/NoteImageList";
import { useCompositionStore } from "../../stores/noteComposition.store";

function NoteProjectDetail() {
  const { items } = useCompositionStore();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const preventBrowserZoom = (e: WheelEvent) => {
      if (!e.ctrlKey) return;

      const target = e.target as HTMLElement;
      if (target.closest("[data-main-container]")) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventBrowserZoom, { passive: false });
    return () => window.removeEventListener("wheel", preventBrowserZoom);
  }, []);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey) return;
    e.preventDefault();

    setScale((prev) => Math.min(2, Math.max(0.5, prev - e.deltaY * 0.001)));
  };
  const workspaceRef = useRef<HTMLDivElement>(null);

  const renderComponentByType = (composition: NoteComposition) => {
    switch (composition.noteComponentType) {
      case NoteComponentType.NOTEBOX:
        return (
          <NoteBox
            workspaceRef={workspaceRef}
            key={composition.noteCompositionId}
            noteCompositionId={composition.noteCompositionId}
            data={composition}
          />
        );
      case NoteComponentType.NOTEIMAGEBOX:
        return (
          <NoteImageList
            workspaceRef={workspaceRef}
            key={composition.noteCompositionId}
            noteCompositionId={composition.noteCompositionId}
            data={composition}
          />
        );

      case NoteComponentType.NOTELIST:
        return (
          <NoteList
            workspaceRef={workspaceRef}
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
    <div
      data-main-container
      onWheel={onWheel}
      ref={workspaceRef}
      css={s.workSpaceBackground}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          width: "100%",
          height: "100%",
        }}
      >
        {items.map((composition) => renderComponentByType(composition))}
      </div>
    </div>
  );
}

export default NoteProjectDetail;
