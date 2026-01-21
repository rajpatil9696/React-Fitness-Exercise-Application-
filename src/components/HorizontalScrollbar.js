import React from 'react'
import { Box } from '@mui/material'
import BodyPart from './BodyPart'

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart }) => {
  return (
    <Box sx={{ display: 'flex', overflowX: 'auto' }}>
      {data.map((item) => (
        <Box key={item} m="0 40px">
          <BodyPart
            item={item}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
        </Box>
      ))}
    </Box>
  )
}

export default HorizontalScrollbar
