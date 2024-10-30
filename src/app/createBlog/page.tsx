"use client";

import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CreateIcon from '@mui/icons-material/Create';
import { createBlogApi } from '@/app/createBlog/api/createBlog';
import { uploadBlogImage } from '@/utils/uploadImage';
import { compressImage } from '@/utils/uploadImage';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CreateBlog = () => {
  const router = useRouter();
  const [ingredient, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [kitchenWare, setKitchenWare] = useState(['']);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [serve, setServe] = useState(1);
  const [time, setTime] = useState('');
  const [IsGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
      } catch (error) {
        toast.error('Error preparing image for upload');
        console.error('Image preparation error:', error);
      }
    }
  };

  // Functions to handle input updates
  const addIngredient = () => setIngredients([...ingredient, '']);
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredient];
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

    try {
      let image_url = '';
      if (imageFile) {
        setIsUploading(true);
        image_url = await uploadBlogImage(imageFile, (progress) => {
          setUploadProgress(progress);
        });
        setIsUploading(false);
      }
      const blogData = {
        image_url,
        name,
        description,
        serve,
        time,
        ingredient,
        kitchentools: kitchenWare,
        recipe: steps,
        IsGenerated,
      };

      const response = await createBlogApi.createBlog(blogData);
      setSuccess("Blog created successfully!");
      setError(null); // Clear any previous errors
    } 
    catch (error: any) {
      setError(error.message || "Failed to create blog.");
      setSuccess(null); // Clear any previous success message
    } finally {
      setIsLoading(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
    router.push('/feedHome');
  };

  return (
    <div className='flex justify-center h-full'>
      <div className='bg-white text-black w-4/5 flex flex-col items-center'>
        <h1 className='text-4xl font-semibold m-6 text-center'>Share The Recipe<br />You Discovered!</h1>

        {/* Upload Image */}
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-full rounded-2xl overflow-hidden bg-[#80AA50] hover:bg-[#6d9343] transition-colors duration-200 flex flex-col items-center justify-center relative"
              disabled={isUploading}
            >
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      <p className="text-white mt-2">{Math.round(uploadProgress)}%</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-white flex flex-col items-center">
                  <Upload className="h-12 w-12" />
                  <span className="mt-2">Upload Image</span>
                </div>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </div>
        </div>

        {/* Title Input */}
        <TextField
          id="title"
          label="Title"
          multiline
          maxRows={2}
          className='w-80 my-2'
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            value={serve}
            onChange={(e) => setServe(parseInt(e.target.value))}
            className='w-32 my-2'
          />
          <TextField
            label="How long?(hh:mm)"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className='w-32 my-2'
          />
        </div>

        {/* Ingredients */}
        <h2 className='w-80 flex justify-center text-2xl font-medium my-3 pt-2 border-t-4 border-yellow-400'>Ingredients</h2>
        <div className='flex flex-col items-center'>
          {ingredient.map((ingredient, index) => (
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
          control={<Checkbox checked={IsGenerated} onChange={(e) => setIsGenerated(e.target.checked)} />}
          label="สูตรนี้มีการอ้างอิงมาจาก AI"
        />

        {/* Submit and Delete Buttons */}
        <div className='w-80 flex justify-center my-8'>
          <Button variant="contained" endIcon={<CreateIcon />} onClick={handleSubmit} className='bg-green-600' >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Creating...
              </>
            ) : (
              'Create'
            )}
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
