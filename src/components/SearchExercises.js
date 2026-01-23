import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography, TextField, Button } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      )

      if (Array.isArray(bodyPartsData)) {
        setBodyParts(['all', ...bodyPartsData])
      }
    }

    fetchExercisesData()
  }, [])

  const handleSearch = async () => {
    if (!search.trim()) return

    const exerciseData = await fetchData(
      'https://exercisedb.p.rapidapi.com/exercises',
      exerciseOptions
    )

    if (!Array.isArray(exerciseData)) return

    const searchedExercises = exerciseData.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(search) ||
        exercise.target.toLowerCase().includes(search) ||
        exercise.bodyPart.toLowerCase().includes(search)
    )

    setSearch('')
    setExercises(searchedExercises)
  }

  return (
    <Stack alignItems="center" mt="37px" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          placeholder="Search Exercises"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          sx={{
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px'
          }}
        />

        <Button
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            position: 'absolute',
            right: 0,
            height: '56px'
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  )
}

export default SearchExercises
