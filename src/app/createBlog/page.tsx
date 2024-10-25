'use client';

import React, {useState} from 'react'
import InputFileUpload from './components/InputFileUpload'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const creatBlog = () => {
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [kitchenWare, setKitchenWare] = useState(['']);

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addKitchenWare = () => {
    setKitchenWare([...kitchenWare, '']);
  }

  const updateKitchenWare = (index: number, value: string) => {
    const newKitchenWare = [...kitchenWare];
    newKitchenWare[index] = value;
    setKitchenWare(newKitchenWare);
  }

  return (
    <div className='flex justify-center h-full'>
      <div className='bg-white text-black w-4/5 flex flex-col items-center'>
        <h1 className='text-4xl font-semibold m-6 text-center'>Share The Recipe<br/>You Discovered!</h1>
        <div className='bg-slate-600 flex justify-center items-center w-60 h-60 p-5 m-6 rounded-xl'>
          <InputFileUpload/>
        </div>
        <div>
          <TextField
            id="title"
            label="Title"
            multiline
            maxRows={2}
            className='w-80 my-2'
          />
        </div>
        <div>
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            className='w-80 my-2'
          />
        </div>
        <div className='w-80 flex justify-between'>
          <TextField
            label="How many serves?"
            id="serves"
            type='number'
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">For: </InputAdornment>,
              },
            }}
            className='w-32 my-2'
          />
          <TextField
            label="How long?"
            id="minute"
            type='time'
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              },
            }}
            className='w-32 my-2'
          />
        </div>
        <h2 className='w-80 flex justify-center text-2xl font-medium my-3 pt-2 border-t-4 border-yellow-400'>Ingredients</h2>
        <div className='flex flex-col items-center'>
          {ingredients.map((ingredient, index) => (
            <TextField
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              label={index+1}
              className="my-2"
            />
          ))}
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={addIngredient}
            className='bg-yellow-400 text-black mb-2'
          >
            ADD
          </Button>
        </div>
        <h2 className='w-80 flex justify-center text-2xl font-medium my-3 pt-2 border-t-4 border-yellow-400'>KitchenWare</h2>
        <div className='flex flex-col items-center'>
          {kitchenWare.map((kitchenWare, index) => (
            <TextField
              key={index}
              type="text"
              value={kitchenWare}
              onChange={(e) => updateKitchenWare(index, e.target.value)}
              label={index+1}
              className="my-2"
            />
          ))}
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={addKitchenWare}
            className='bg-yellow-400 text-black mb-2'
          >
            ADD
          </Button>
        </div>
        <h2 className='w-80 flex justify-center text-2xl font-medium my-3 pt-2 border-t-4 border-yellow-400'>STEP</h2>
        <div className='flex flex-col items-center'>
          {steps.map((step, index) => (
            <TextField
              key={index}
              type="text"
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              label={index+1}
              multiline
              rows={2}
              className="w-80 my-2"
            />
          ))}
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={addStep}
            className='bg-yellow-400 text-black mb-4'
          >
            ADD
          </Button>
          <div>
            <FormControlLabel control={<Checkbox />} label="สูตรนี้มีการอ้างอิงมาจาก AI"/>
          </div>
          <div className='w-80 flex justify-between my-8'>
            <Button 
              variant="contained" 
              endIcon={<CreateIcon />}
              className='bg-green-600'
            >
              Create
            </Button>
            <Button 
              variant="contained" 
              endIcon={<DeleteIcon />}
              className='bg-red-600'
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default creatBlog


