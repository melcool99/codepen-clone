import React, { Fragment } from 'react'
import CellListItem from './CellListItem'
import { useAppSelector } from '../store/hooks/hooks'
import AddCell from './AddCell'
const CellList: React.FC = () => {
  const cells = useAppSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  )

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
