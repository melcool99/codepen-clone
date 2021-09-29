import { useState, useEffect } from 'react'
import { bundle } from '../bundler'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import Resizable from './Resizable'

const CodeCell = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let timer = setTimeout(async () => {
      const output = await bundle(input)
      setCode(output.code)
      setError(output.error)
    }, 1000);
    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <Resizable direction='vertical'>
      <div style={{height:'100%', display:'flex', flexDirection:'row'}}>
        <Resizable
          direction='horizontal'
        >
        <CodeEditor
          initialValue={''}
          onChange={(value) => {
            setInput(value)
          }}
        />
        </Resizable>
        <Preview code={code} error={error}/>
      </div>
    </Resizable>
  )
}

export default CodeCell
