import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import HeroBanner from '../components/HeroBanner'
import Exercises from '../components/Exercises'
import SearchExercises from '../components/SearchExercises'


const Home = () => {
   const[exercises , setExercises] = useState([]) //state to hold the exercises data
   const[bodyPart , setBodyPart] = useState('all') //state to hold the selected body part
  return (
    <Box>
      <HeroBanner />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyParts={setBodyPart}/>
      <Exercises exercises={exercises} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
    </Box>
  )
}

export default Home
