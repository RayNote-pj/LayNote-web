import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './rootContainerStyle'

interface RootContainerProps {
  children: React.ReactNode
}

function RootContainer({ children }: RootContainerProps) {
  return (
    <div css = {s.container}>
      {children}
    </div>
  )
}

export default RootContainer