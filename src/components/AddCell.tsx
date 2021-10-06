import React from 'react'
import { useAppDispatch } from '../app/hooks/hooks'
import { insertCellAfter } from '../app/slices/cellsSlice'
import './AddCell.css'

interface AddCellProps {
  prevCellId: string | null;
  forceVisible? :boolean
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const dispatch = useAppDispatch()
 
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() =>
            dispatch(insertCellAfter({ id: prevCellId, type: 'code' }))
          }>
          <span className='icon is-small'>
            <i className='fas fa-plus'></i>
          </span>
          <span> Code </span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() =>
            dispatch(insertCellAfter({ id: prevCellId, type: 'text' }))
          }>
           <span className='icon is-small'>
            <i className='fas fa-plus'></i>
          </span>
          <span> Text </span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  )
}

export default AddCell
