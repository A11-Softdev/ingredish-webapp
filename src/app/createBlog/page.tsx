"use client"
import React, { useState, useRef, useEffect } from "react";
import { ChefHat, Upload, Plus, Clock, Users, Utensils, FileText, Save } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { compressImage, uploadBlogImage } from "@/utils/uploadImage";
import toast from "react-hot-toast";
import { createBlogApi } from "./api/createBlog";

const CreateBlog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data")
    ? JSON.parse(decodeURIComponent(searchParams.get("data")!))
    : null;
  const recipeData = data?.Menu;

  // States
  const [ingredient, setIngredients] = useState<string[]>(
    recipeData?.Recipe.Ingredients.map(
      (ing: { name: string; quantity: string; preparation: string }) =>
        `${ing.name} - ${ing.quantity} (${ing.preparation})`
    ) || [""]
  );
  const [steps, setSteps] = useState<string[]>(
    recipeData?.Recipe.Instructions.map(
      (step: { description: string }) => step.description
    ) || [""]
  );

  const [kitchenWare, setKitchenWare] = useState([""]);
  const [name, setName] = useState(recipeData?.MenuItem.Name || "");
  const [description, setDescription] = useState(recipeData?.MenuItem.Description || "");
  const [serve, setServe] = useState(1);
  const [time, setTime] = useState(recipeData?.MenuItem.EstimatedTimeCook || "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [IsGenerated, setIsGenerated] = useState(true);

  // Handle image change
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
        toast.error("Error preparing image for upload");
        console.error("Image preparation error:", error);
      }
    }
  };

  // Form update handlers
  const addIngredient = () => setIngredients([...ingredient, ""]);
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredient];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  const addStep = () => setSteps([...steps, ""]);
  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  const addKitchenWare = () => setKitchenWare([...kitchenWare, ""]);
  const updateKitchenWare = (index: number, value: string) => {
    const newKitchenWare = [...kitchenWare];
    newKitchenWare[index] = value;
    setKitchenWare(newKitchenWare);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      let image_url = "";
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

      await createBlogApi.createBlog(blogData);
      toast.success("Blog created successfully!");
      router.push("/feedHome");
    } catch (error: any) {
      toast.error(error.message || "Failed to create blog.");
    } finally {
      setIsLoading(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-8">
          <ChefHat className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            Share Your Recipe
          </h1>
          <p className="text-gray-600 mt-2">Spread the joy of cooking with others</p>
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <div className="relative w-full h-72 rounded-xl overflow-hidden bg-gray-100">
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`w-full h-full flex flex-col items-center justify-center ${!imagePreview ? 'hover:bg-gray-200 transition-colors' : ''
                }`}
              disabled={isUploading}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-full h-full object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      <p className="text-white mt-2">{Math.round(uploadProgress)}%</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-500 flex flex-col items-center">
                  <Upload className="w-12 h-12 mb-2" />
                  <span>Upload Recipe Image</span>
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

        {/* Basic Information */}
        <div className="space-y-6">
          {/* Title & Description */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Enter recipe title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Describe your recipe"
              />
            </div>
          </div>

          {/* Serving & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={serve}
                  onChange={(e) => setServe(parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Number of servings"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="e.g. 30 mins"
                />
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
              <button
                onClick={addIngredient}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Ingredient
              </button>
            </div>
            <div className="space-y-3">
              {ingredient.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder={`Ingredient ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Kitchen Tools */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Kitchen Tools</h2>
              <button
                onClick={addKitchenWare}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Tool
              </button>
            </div>
            <div className="space-y-3">
              {kitchenWare.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => updateKitchenWare(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder={`Tool ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Instructions</h2>
              <button
                onClick={addStep}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    className="w-full pl-14 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder={`Step ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading || isUploading}
              className="w-full py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Create Recipe
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
