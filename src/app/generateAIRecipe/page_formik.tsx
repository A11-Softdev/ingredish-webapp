"use client";
import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";

const AiRecipeInputPage = () => {
  const formik = useFormik({
    initialValues: {
      menu: "",
      ingredients: ["", "", ""],
      kitchenTools: [],
    },
    onSubmit: (values) => {
      console.log("Form Values:", values);
      // Handle form submission
    },
  });

  const kitchenTools = ["กระทะ", "หม้อ", "เตาอบ", "เครื่องปั่น"]; // Add more options as needed

  const handleToolChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    let updatedTools = [...formik.values.kitchenTools];

    if (checked) {
      updatedTools.push(value);
    } else {
      updatedTools = updatedTools.filter((tool) => tool !== value);
    }

    formik.setFieldValue("kitchenTools", updatedTools);
  };

  const handleAllChange = (event) => {
    if (event.target.checked) {
      formik.setFieldValue("kitchenTools", kitchenTools);
    } else {
      formik.setFieldValue("kitchenTools", []);
    }
  };

  return (
    <div className="w-full flex px-14 bg-slate-200">
      <div className="w-2/5 p-12 bg-white">
        <form onSubmit={formik.handleSubmit} className="space-y-4 p-6">
          {/* Menu Input */}
          <TextField
            label="เมนูที่อยากกิน"
            name="menu"
            fullWidth
            value={formik.values.menu}
            onChange={formik.handleChange}
            className="w-full"
          />

          {/* Ingredients Input */}
          <div className="space-y-2">
            {formik.values.ingredients.map((ingredient, index) => (
              <TextField
                key={index}
                label={`วัตถุดิบหลัก ${index + 1}`}
                name={`ingredients[${index}]`}
                fullWidth
                value={ingredient}
                onChange={formik.handleChange}
                className="w-full"
              />
            ))}
          </div>

          {/* Kitchen Tools Checkboxes */}
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      formik.values.kitchenTools.length === kitchenTools.length
                    }
                    onChange={handleAllChange}
                  />
                }
                label="All"
              />
              {kitchenTools.map((tool, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      value={tool}
                      checked={formik.values.kitchenTools.includes(tool)}
                      onChange={handleToolChange}
                    />
                  }
                  label={tool}
                />
              ))}
            </FormGroup>
          </FormControl>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Generate Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiRecipeInputPage;
