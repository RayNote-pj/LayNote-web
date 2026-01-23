import React from 'react'
import { NoteComposition } from '../../../types/dto';

interface NoteProps {
  noteCompositionId: string;
  data: NoteComposition;
}

function NoteImageList({ data }: NoteProps) {
  return (
    <div>NoteImageList</div>
  )
}

export default NoteImageList