import { Box } from '@mui/material'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  str: string
  format?: boolean
}

export function JsonDisplay({
                  str,
                  format = false
                }: Props) {

  return (
    <Box
      component='pre'
      sx={{
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}>
      <SyntaxHighlighter
        style={oneLight}
        language='js'
        wrapLongLines>
        {format === true ? JSON.stringify(JSON.parse(str), null, 2) : str }
      </SyntaxHighlighter>
    </Box>
  )
}
