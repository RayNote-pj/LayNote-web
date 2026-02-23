import React, { Children, useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './mainContainerStyle'

interface RootContainerProps {
  children: React.ReactNode;
}

function MainContainer({ children }: RootContainerProps) {
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
    return () =>
      window.removeEventListener("wheel", preventBrowserZoom);
  }, []);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey) return;
    e.preventDefault();

    setScale(prev =>
      Math.min(2, Math.max(0.5, prev - e.deltaY * 0.001))
    );
  };

  return (
    <div
      data-main-container
      onWheel={onWheel}
      css={s.mainContainerBackground}
    >
        {children}
    </div>
  );
}

export default MainContainer

