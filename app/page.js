"use client";
import CalculatorAbsorption from "@/components/FormAbsorption";
import CalculatorStripping from "@/components/FormStripping";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [mode, setMode] = useState("absorption");
  const form = useForm({
    defaultValues: {
      Mode: "absorption",
    },
    mode: "onChange",
  });
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const formMode = watch("Mode");

  useEffect(() => {
    setMode(formMode);
  }, [formMode]);

  return (
    <section className="mb-16 pt-12 w-full px-4 md:px-28 flex flex-col justify-center items-center">
      <form className="">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              {...register("Mode", { required: "Please select a mode" })}
              type="radio"
              value="absorption"
              className="form-radio text-blue-600"
            />
            <span>Absorption</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              {...register("Mode", { required: "Please select a mode" })}
              type="radio"
              value="stripping"
              className="form-radio text-blue-600"
            />
            <span>Stripping</span>
          </label>
        </div>
      </form>
      {mode === "absorption" ? (
        <CalculatorAbsorption />
      ) : (
        <CalculatorStripping />
      )}
    </section>
  );
}
