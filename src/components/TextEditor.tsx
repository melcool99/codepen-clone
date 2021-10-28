import React, { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import './TextEditor.css'
import { Cell } from '../store/interfaces/cell'
import {useAppDispatch} from '../store/hooks/hooks'
import {updateCell} from '../store/slices/cellsSlice'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
  const [edit, setEdit] = useState(false)
  const editRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()

  useEffect( () => {
    const listener = (event:MouseEvent) => {
      if (editRef.current && event.target && editRef.current.contains(event.target as Node)) {
        return
      }
      setEdit(false)
    }
    document.addEventListener('click', listener, {capture:true})

    return () => {
      document.removeEventListener('click', listener, {capture:true})
    }
  }, [] )

  return (
    <div className='text-editor card'>
      {edit && (
        <div ref={editRef} >
          <MDEditor value={cell.content} onChange={(val) => dispatch(updateCell({id:cell.id, content:(val || '')}))} />
        </div>
      )}

      <div onClick={() => setEdit(true) }>
        <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
        </div>
      </div>
    </div>
  )
}

export default TextEditor


