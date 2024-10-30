"use client";

import React, { useState } from 'react';
import InputFileUpload from './components/InputFileUpload';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { createBlogApi } from '@/app/createBlog/api/createBlog'; // Import API function

const CreateBlog = () => {
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [kitchenWare, setKitchenWare] = useState(['']);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [serves, setServes] = useState(1);
  const [time, setTime] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Functions to handle input updates
  const addIngredient = () => setIngredients([...ingredients, '']);
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  const addStep = () => setSteps([...steps, '']);
  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  const addKitchenWare = () => setKitchenWare([...kitchenWare, '']);
  const updateKitchenWare = (index: number, value: string) => {
    const newKitchenWare = [...kitchenWare];
    newKitchenWare[index] = value;
    setKitchenWare(newKitchenWare);
  };

  const handleSubmit = async () => {
    const blogData = {
      title,
      description,
      serves,
      time,
      ingredients,
      kitchenWares: kitchenWare,
      recipe: steps,
      isGenerated,
    };

    try {
      const response = await createBlogApi.createBlog(blogData);
      setSuccess("Blog created successfully!");
      setError(null); // Clear any previous errors
    } catch (error: any) {
      setError(error.message || "Failed to create blog.");
      setSuccess(null); // Clear any previous success message
    }
  };

  return (
    <div className='flex justify-center h-full'>
      <div className='bg-white text-black w-4/5 flex flex-col items-center'>
        <h1 className='text-4xl font-semibold m-6 text-center'>Share The Recipe<br />You Discovered!</h1>
        
        {/* Upload Image */}
        <div className='bg-slate-600 flex justify-center items-center w-60 h-60 p-5 m-6 rounded-xl'>
          <InputFileUpload />
        </div>

        {/* Title Input */}
        <TextField
          id="title"
          label="Title"
          multiline
          maxRows={2}
          className='w-80 my-2'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description Input */}
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          className='w-80 my-2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Serves and Time Inputs */}
        <div className='w-80 flex justify-between'>
          <TextField
            label="How many serves?"
            id="serves"
            type='number'
            value={serves}
            onChange={(e) => setServes(parseInt(e.target.value))}
            className='w-32 my-2'
          />
          <TextField
            label="How long? (minutes)"
            id="time"
            type='number'
            value={time}
            onChange={(e) => setTime(parseInt(e.target.value))}
            className='w-32 my-2'
          />
        </div>

        {/* Ingredients */}
        <h2 className='w-80 flex justify-center text-2xl font-medium my-3 pt-2 border-t-4 border-yellow-400'>Ingredients</h2>
        <div className='flex flex-col items-center'>
          {ingredients.map((ingredient, index) => (
            <TextField
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              label={index + 1}
              className="my-2"
            />
          ))}
          <Button variant="contained" startIcon={<AddIcon />} onClick={addIngredient} className='bg-yellow-400 text-black mb-2'>
            ADD
          </Button>
        </div>

        {/* KitchenWare */}
        <h2 className='w-80 flex justify-center text-2xl font-medium my-3 pt-2 border-t-4 border-yellow-400'>KitchenWare</h2>
        <div className='flex flex-col items-center'>
          {kitchenWare.map((item, index) => (
            <TextField
              key={index}
              type="text"
              value={item}
              onChange={(e) => updateKitchenWare(index, e.target.value)}
              label={index + 1}
              className="my-2"
            />
          ))}
          <Button variant="contained" startIcon={<AddIcon />} onClick={addKitchenWare} className='bg-yellow-400 text-black mb-2'>
            ADD
          </Button>
        </div>

        {/* Steps */}
        <h2 className='w-80 flex justify-center text-2xl font-medium my-3 pt-2 border-t-4 border-yellow-400'>STEP</h2>
        <div className='flex flex-col items-center'>
          {steps.map((step, index) => (
            <TextField
              key={index}
              type="text"
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              label={index + 1}
              multiline
              rows={2}
              className="w-80 my-2"
            />
          ))}
          <Button variant="contained" startIcon={<AddIcon />} onClick={addStep} className='bg-yellow-400 text-black mb-4'>
            ADD
          </Button>
        </div>

        {/* AI Reference Checkbox */}
        <FormControlLabel
          control={<Checkbox checked={isGenerated} onChange={(e) => setIsGenerated(e.target.checked)} />}
          label="สูตรนี้มีการอ้างอิงมาจาก AI"
        />

        {/* Submit and Delete Buttons */}
        <div className='w-80 flex justify-between my-8'>
          <Button variant="contained" endIcon={<CreateIcon />} onClick={handleSubmit} className='bg-green-600'>
            Create
          </Button>
          <Button variant="contained" endIcon={<DeleteIcon />} className='bg-red-600'>
            Delete
          </Button>
        </div>

        {/* Error or Success Message */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default CreateBlog;
