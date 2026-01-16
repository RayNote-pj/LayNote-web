import React, { Children } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './mainContainerStyle'

interface RootContainerProps {
  children: React.ReactNode;
}

function MainContainer({ children }: RootContainerProps) {
  return (
    <div css = {s.mainContainerBackground}>
      {children}
    </div>
  )
}

export default MainContainer