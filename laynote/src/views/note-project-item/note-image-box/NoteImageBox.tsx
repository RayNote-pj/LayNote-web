import React from 'react'
import { NoteComposition, NoteImageBoxDto } from '../../../types/dto'

interface NoteProps {
  noteCompositionId: string;
  data: NoteComposition;
}

function NoteImageBox(data:NoteProps) {
  return (
    <div>NoteImageBox</div>
  )
}

export default NoteImageBox