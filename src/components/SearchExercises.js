import React from 'react'
import { useState ,useEffect } from 'react'
import { Box ,Stack ,Typography ,TextField ,Button} from '@mui/material'
import { exerciseOptions,fetchData } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'

const SearchExercises = () => {

  const [search , setSearch] = useState("") //state to hold the search input
  const[exercises , setExercises] = useState([]) //state to hold the exercises data
  const[bodyParts , setBodyParts] = useState([]) //state to hold the body parts data

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartsList', exerciseOptions);
      
      setBodyParts(['all' , ...bodyPartsData]); //updating the bodyParts state with fetched data

    } 
  }, []);

  const handleSearch = async () => {
    //function to handle the search functionality
    if(search){
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      const searchedExercises = exerciseData.filter(            //filtering the exercises based on the search input
        (exercise) => exercise.name.toLowerCase().includes(search) ||
                      exercise.target.toLowerCase().includes(search) ||
                      exercise.bodyPart.toLowerCase().includes(search)
      );

      setSearch(''); //clearing the search input
      setExercises(searchedExercises); //updating the exercises state with the searched exercises
    }
  }

  return (
    <Stack alignItems={"center"} mt={"37px"} justifyContent={"center"} p={"20px"}>

        <Typography fontWeight={700} sx={{fontSize:{lg:'44px' , xs:'30px'}}} mb={"50px"} textAlign={"center"}>
            Awesome Exercises You <br/> Should Know
        </Typography>

        <Box position={"relative"} mb={"72px"}>
            <TextField height={"76px"} sx={{input:{fontWeight:'700' , border:'none' , borderRadius:'4px'}, width:{lg:'800px' , xs:'350px'}, backgroundColor:'#fff' , borderRadius:'40px'}} placeholder='Search Exercises' type='text' onChange={(e)=>setSearch(e.target.value.toLocaleLowerCase())} value={search}/>
            <Button className='search-btn' sx={{bgcolor:'#FF2625' , color:'#fff' , textTransform:'none' , width:{lg:'175px' , xs:'80px'} , fontSize:{lg:'20px' , xs:'14px'} , height:'56px' , position:'absolute' , right:'0'}} 
           onClick={handleSearch} >
                Search
            </Button>
        </Box>

        <Box sx={{position:"relative" , width:"100%" , p:"20px"}}>
            {/* Horizontal scrollbar for body parts can be implemented here */}
            <HorizontalScrollbar data={bodyParts} />
        </Box>

    </Stack>
  )
}

export default SearchExercises
