import { useEffect } from 'react'
import { Cell } from '../app/interfaces/cell'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import { bundle } from '../bundler'
import Resizable from './Resizable'
import { useAppDispatch, useAppSelector } from '../app/hooks/hooks'
import { updateCell } from '../app/slices/cellsSlice'
import { bundleStart, bundleComplete } from '../app/slices/bundlesSlice'
interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch()
  const bundleState = useAppSelector((state) => state.bundles[cell.id])
  useEffect(() => {
    let timer = setTimeout(async () => {
      dispatch(bundleStart({ cellId: cell.id }))
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
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [cell.content, cell.id, dispatch])

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
        {bundleState && (
          <Preview code={bundleState.code} error={bundleState.err} />
        )}
      </div>
    </Resizable>
  )
}

export default CodeCell
