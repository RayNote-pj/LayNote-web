import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './rootLayoutStyle' 

interface RootLayoutProps {
  children : React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <div css = {s.layout}>
      {children}
    </div> 
  )
}

export default RootLayout