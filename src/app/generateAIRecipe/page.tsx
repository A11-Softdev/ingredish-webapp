"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";

type FormValues = {
  recipeName: string;
  ingredients: string[];
  kitchenTools: string[];
  allTools: boolean;
};

const initialFormValues: FormValues = {
  recipeName: "",
  ingredients: ["", "", ""],
  kitchenTools: [],
  allTools: false,
};

const Page: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const kitchenToolsOptions = [
    "กระทะ",
    "หม้อ",
    "เตาอบ",
    "เครื่องปั่น",
    "เครื่องต้ม",
    "ไมโครเวฟ",
    "เตาย่าง",
    "เตาแก๊ส",
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Check if all fields are empty
    const allFieldsEmpty =
      !formValues.recipeName.trim() &&
      !formValues.ingredients.some((ingredient) => ingredient.trim()) &&
      formValues.kitchenTools.length === 0;

    if (allFieldsEmpty) {
      newErrors.form = "Please fill out at least one field.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "recipeName") {
      setFormValues({ ...formValues, recipeName: value });
    } else if (type === "checkbox") {
      if (name === "allTools") {
        setFormValues({
          ...formValues,
          kitchenTools: checked ? kitchenToolsOptions : [],
          allTools: checked,
        });
      } else {
        const updatedTools = checked
          ? [...formValues.kitchenTools, value]
          : formValues.kitchenTools.filter((tool) => tool !== value);
        setFormValues({
          ...formValues,
          kitchenTools: updatedTools,
          allTools: updatedTools.length === kitchenToolsOptions.length,
        });
      }
    } else {
      const ingredients = [...formValues.ingredients];
      ingredients[parseInt(name)] = value;
      setFormValues({ ...formValues, ingredients });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted:", formValues);
      // Handle form submission logic here
    }
  };

  return (
    <>
    <div className="flex w-full px-14 bg-slate-200">
      <div className="w-2/5 p-12 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Menu Input */}
          <div>
            <label htmlFor="recipeName" className="text-xl font-semibold">
              เมนูที่อยากกิน
            </label>
            <input
              type="text"
              name="recipeName"
              id="recipeName"
              className="w-full mt-2 rounded-lg text-black bg-[#F1C339] placeholder-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formValues.recipeName}
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
            <div>
              <input
                type="checkbox"
                id="allTools"
                name="allTools"
                checked={formValues.allTools}
                onChange={handleChange}
                className="h-4 w-4 text-black focus:ring-yellow-500"
              />
              <label htmlFor="allTools" className="ml-2 text-lg text-gray-700">
                All
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {kitchenToolsOptions.map((tool, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`tool${index}`}
                    name={`tool${index}`}
                    value={tool}
                    checked={formValues.kitchenTools.includes(tool)}
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
          {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#80AA50] text-white py-2 px-4 rounded hover:bg-[#5b7938]"
          >
            Generate Recipe
          </button>
        </form>
      </div>
      <div className="w-3/5 px-12 pt-8 flex flex-col gap-4 justify-between bg-[#80AA50]">
        <div className="text-center text-4xl font-bold mb-4">Result!</div>
        {
          <div className="outputmenu bg-white border-slate-600 border-2 rounded-lg p-4 font-bold text-xl">
            เมนูที่แนะนำ คือ {formValues.recipeName}
          </div>
        }
        {
          <div className="outputingredient flex-1 bg-white border-slate-600 border-2 rounded-lg p-4">
          <span className="font-bold text-xl">วัตถุดิบ</span>
          <ul className="list-disc ml-8">
            {formValues.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          </div>
        }
        {<div className="outputmethod flex-1 bg-white border-slate-600 border-2 rounded-lg p-4">
          <span className="font-bold text-xl">วิธีทำ</span>
          <ul className="list-decimal ml-8">
            {formValues.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul></div>}
        {<div className="outputtip flex-1 bg-white border-slate-600 border-2 rounded-lg p-4">
          <span className="font-bold text-xl">เคล็ดลับ</span>
          <ul className="list-disc ml-8">
            {formValues.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul></div>}
      </div>
    </div>
      <div className="flex w-full min-w-[100px] pt-8 justify-end bg-slate-200 text-white "><button className="mb-4 rounded-[30px] mr-[100px] p-4 px-12 font-bold text-lg bg-[#80AA50]"><FontAwesomeIcon className="mr-2" icon={faShare}/>แบ่งปันสูตรนี้</button></div>
    </>
  );
};

export default Page;
