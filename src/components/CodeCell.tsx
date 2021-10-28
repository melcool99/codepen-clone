import { useEffect } from 'react'
import { Cell } from '../store/interfaces/cell'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import { bundle } from '../bundler'
import Resizable from './Resizable'
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks'
import { updateCell } from '../store/slices/cellsSlice'
import { bundleStart, bundleComplete } from '../store/slices/bundlesSlice'
import './CodeCell.css'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch()
  const bundleState = useAppSelector((state) => state.bundles[cell.id])
  const mergedCode = useAppSelector((state) => {
    const { data, order } = state.cells
    const orderedCells = order.map((id) => data[id])
    const cumulativeCode = []
    for (let c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.content)
      }
      if (c.id === cell.id) {
        break
      }
    }
    
    return cumulativeCode
  })

  useEffect(() => {
    if (!bundle) {
      dispatch(bundleStart({ cellId: cell.id, code: mergedCode.join('\n') }))
      return
    }
    let timer = setTimeout(async () => {
      dispatch(bundleStart({ cellId: cell.id, code: mergedCode.join('\n') }))
      const result = await bundle(cell.content)
      dispatch(
        bundleComplete({
          cellId: cell.id,
          bundle: {
            code: result.code,
            err: result.error,
          },
        })
      )
    }, 750)
    return () => {
      clearTimeout(timer)
    }
  }, [cell.id, dispatch, cell.content, mergedCode.join('\n')])

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) =>
              dispatch(updateCell({ id: cell.id, content: value }))
            }
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundleState || bundleState.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundleState.code} error={bundleState.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
