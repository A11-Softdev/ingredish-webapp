"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import axios from "axios";
import { RecipeResponse } from "./types/menuTypes";
import CircularProgress from "@mui/material/CircularProgress";

type FormValues = {
  optional_dish: string;
  ingredients: string[];
  supplies: string[];
  allTools: boolean;
};

const initialFormValues: FormValues = {
  optional_dish: "",
  ingredients: ["", "", ""],
  supplies: [],
  allTools: false,
};

const Page: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [responseData, setResponseData] = useState<RecipeResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const suppliesOptions = [
    "กระทะ",
    "หม้อ",
    "เตาอบ",
    "เครื่องปั่น",
    "เครื่องต้ม",
    "ไมโครเวฟ",
    "เตาย่าง",
    "เตาแก๊ส",
    "หม้ออบลมร้อน", // Air fryer
    "หม้อหุงข้าว", // Rice cooker
    "เครื่องบดสับ", // Food processor
    "เครื่องกดกาแฟ", // Coffee maker
    "เตาไฟฟ้า", // Electric stove
    "อุปกรณ์นึ่ง", // Steamer
    "เครื่องทำโยเกิร์ต", // Yogurt maker
    "เตาเผา", // Grill
    "อุปกรณ์ทำขนม", // Pastry tools
    "อุปกรณ์ทำพาสต้า", // Pasta maker
    "กระบอกฉีด", // Piping bag
    "เครื่องทำไอศกรีม", // Ice cream maker
    "อุปกรณ์ทำซูชิ", // Sushi making kit
    "เครื่องทำฟองนม", // Milk frother
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Check if all fields are empty
    const allFieldsEmpty =
      !formValues.optional_dish.trim() &&
      !formValues.ingredients.some((ingredient) => ingredient.trim()) &&
      formValues.supplies.length === 0;

    if (allFieldsEmpty) {
      newErrors.form = "Please fill out at least one field.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "optional_dish") {
      setFormValues({ ...formValues, optional_dish: value });
    } else if (type === "checkbox") {
      if (name === "allTools") {
        setFormValues({
          ...formValues,
          supplies: checked ? suppliesOptions : [],
          allTools: checked,
        });
      } else {
        const updatedTools = checked
          ? [...formValues.supplies, value]
          : formValues.supplies.filter((tool) => tool !== value);
        setFormValues({
          ...formValues,
          supplies: updatedTools,
          allTools: updatedTools.length === suppliesOptions.length,
        });
      }
    } else {
      const ingredients = [...formValues.ingredients];
      ingredients[parseInt(name)] = value;
      setFormValues({ ...formValues, ingredients });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && !isSubmitting) {
      setIsSubmitting(true); // Prevent multiple submissions

      try {
        const submissionData = {
          optional_dish: formValues.optional_dish,
          ingredients: formValues.ingredients,
          supplies: formValues.supplies,
        };
        // console.log("Submission data:", submissionData);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/generate-recipe/`,
          submissionData
        );

        const data: RecipeResponse = response.data;
        console.log("Response data:", data);
        if (data.Menu.error) {
          setErrorMessage(
            data.Menu.raw_response || "An unknown error occurred."
          );
          setResponseData(data);
        } else {
          setResponseData(data);
          setErrorMessage(null);
        }

        // alert("Recipe generated successfully!");
      } catch (error) {
        console.error("Error generating recipe:", error);
        setErrorMessage("Failed to generate recipe.");
      } finally {
        setIsSubmitting(false); // Reset submitting state after request
      }
    }
  };

  return (
    <>
      <div className="flex w-full px-14 bg-slate-200 justify-center relative">
        
        <div className="w-2/5 p-12 bg-white rounded-lg shadow-md ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="text-2xl font-bold mt-4 text-center">
            สร้างเมนูจาก AI
          </div>
            {/* Menu Input */}
            <div>
              <label htmlFor="optional_dish" className="text-xl font-semibold">
                เมนูที่อยากกิน
              </label>
              <input
                type="text"
                name="optional_dish"
                id="optional_dish"
                className="w-full mt-2 rounded-lg text-black bg-[#F1C339] placeholder-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formValues.optional_dish}
                onChange={handleChange}
                placeholder="Enter the dish name"
              />
            </div>

            {/* Ingredients Input */}
            <div className="flex flex-col gap-3">
              <label className="text-xl font-semibold">วัตถุดิบหลัก</label>
              {formValues.ingredients.map((ingredient, index) => (
                <input
                  key={index}
                  type="text"
                  name={index.toString()}
                  className="w-full rounded-lg bg-[#F1C339] text-black placeholder-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={ingredient}
                  onChange={handleChange}
                  placeholder={`Enter ingredient ${index + 1}`}
                />
              ))}
            </div>

            {/* Kitchen Tools Checkboxes */}
            <div className="flex flex-col gap-4">
              <label htmlFor="optional_dish" className="text-xl font-semibold">
                เครื่องครัว
              </label>
              <div>
                <input
                  type="checkbox"
                  id="allTools"
                  name="allTools"
                  checked={formValues.allTools}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-yellow-500"
                />
                <label
                  htmlFor="allTools"
                  className="ml-2 text-lg text-gray-700"
                >
                  All
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {suppliesOptions.map((tool, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`tool${index}`}
                      name={`tool${index}`}
                      value={tool}
                      checked={formValues.supplies.includes(tool)}
                      onChange={handleChange}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-500"
                    />
                    <label
                      htmlFor={`tool${index}`}
                      className="ml-2 text-lg text-gray-700"
                    >
                      {tool}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errors.form && (
              <p className="text-red-500 text-sm">{errors.form}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#80AA50] text-white py-2 px-4 rounded hover:bg-[#5b7938]"
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} /> Submitting...{" "}
                </>
              ) : (
                "Generate Recipe"
              )}
            </button>
          </form>
        </div>
        {errorMessage && (
          <div className="w-3/5 px-12 pt-8 flex flex-col gap-4 ">
            <div className="text-center text-4xl font-bold mb-4">Result!</div>
            <div className="outputmenu bg-white border-slate-600 border-2 rounded-lg p-4  text-xl flex flex-col gap-2">
              <div className="font-bold">{responseData?.Menu.error}</div>
              <div>{errorMessage}</div>
            </div>
          </div>
        )}
        {responseData && !errorMessage && (
          <div className="w-3/5 px-12 pt-8 flex flex-col gap-4 justify-between ">
            <div className="text-center text-4xl font-bold mb-4">Result!</div>
            {
              <div className="outputmenu bg-white border-slate-600 border-2 rounded-lg p-4  text-xl">
                <span className="font-bold">เมนูที่แนะนำ คือ </span>
                <span>{responseData.Menu.MenuItem.Name}</span>
              </div>
            }
            {
              <div className="outputmenu bg-white border-slate-600 border-2 rounded-lg p-4  text-xl flex flex-col">
                <span className="font-bold">คำอธิบาย</span>
                <span>{responseData.Menu.MenuItem.Description}</span>
              </div>
            }
            {
              <div className="outputmenu bg-white border-slate-600 border-2 rounded-lg p-4 text-xl">
                <span className="font-bold">เวลาในการประกอบอาหาร : </span>
                <span>{responseData.Menu.MenuItem.EstimatedTimeCook}</span>
              </div>
            }
            <div className="outputingredient flex-1 bg-white border-slate-600 border-2 rounded-lg p-4">
              <span className="font-bold text-xl">วัตถุดิบ</span>
              <ol className="list-disc ml-8">
                {responseData.Menu.Recipe?.Ingredients?.map(
                  (ingredient, index) => (
                    <li key={index}>
                      <a
                        href={`/search?name=${encodeURIComponent(
                          ingredient.name
                        )}`}
                        className="text-blue-500 hover:underline"
                      >
                        {ingredient.name}
                      </a>{" "}
                      {ingredient.quantity}{" "}
                      {ingredient.preparation != "เตรียมไว้"}
                    </li>
                  )
                )}
              </ol>
            </div>

            {
              <div className="outputmethod flex-1 bg-white border-slate-600 border-2 rounded-lg p-4">
                <span className="font-bold text-xl">วิธีทำ</span>
                <ul className="list-decimal ml-8">
                  {responseData.Menu.Recipe?.Instructions?.map(
                    (instruction, index) => (
                      <li key={index}>{instruction.description}</li>
                    )
                  )}
                </ul>
              </div>
            }
          </div>
        )}
      </div>
      {/* Share Button */}
      {responseData && !errorMessage && (
        <div className="flex w-full min-w-[100px] pt-8 justify-end bg-slate-200 text-white ">
          <button className="mb-4 rounded-[30px] mr-[100px] p-4 px-12 font-bold text-lg bg-[#80AA50]">
            <FontAwesomeIcon className="mr-2" icon={faShare} />
            แบ่งปันสูตรนี้
          </button>
        </div>
      )}
    </>
  );
};

export default Page;
