"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

const CalculatorAbsrorption = () => {
  const [num_trays, setNumTrays] = useState();
  const [x_n, setxn] = useState();
  const [X_n, setXn] = useState();
  const { handleSubmit, register } = useForm();
  const onSubmit = (values) => {
    const mode = Number(values.mode);
    const x_o = Number(values.x_o);
    const y_1 = Number(values.y_1);
    const y_n_1 = Number(values.y_n_1);
    const L = Number(values.L);
    const G = Number(values.G);
    const m = Number(values.m);

    const X_o = x_o / (1 - x_o);
    const Y_1 = y_1 / (1 - y_1);
    const Y_n_1 = y_n_1 / (1 - y_n_1);
    const Ls = L * (1 - x_o);
    const Gs = G * (1 - y_n_1);
    const A = Ls / (m * Gs);
    const X_n = (Y_n_1 - Y_1) / (Ls / Gs) + X_o;
    const x_n = X_n / (1 + X_n);

    let num_trays;

    if (A === 1) {
      if (mode === 1) {
        num_trays = (Y_n_1 - Y_1) / (Y_1 - m * X_o);
      }
    } else {
      num_trays =
        Math.log(
          ((Y_n_1 - m * X_o) / (Y_1 - m * X_o)) * (1 - A ** -1) + A ** -1
        ) / Math.log(A);
    }
    setNumTrays(num_trays);
    setxn(x_n);
    setXn(X_n);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Absorption Tray Calculation
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            x_o (conc. of A in inlet liquid):
          </label>
          <input
            type="text"
            {...register("x_o")}
            required
            className="border p-3 w-full rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            y_n_1 (conc. of A in inlet gas):
          </label>
          <input
            type="text"
            {...register("y_n_1")}
            required
            className="border p-3 w-full rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            y_1 (conc. of A in outlet gas):
          </label>
          <input
            type="text"
            {...register("y_1")}
            required
            className="border p-3 w-full rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Liquid flowrate (L):
          </label>
          <input
            type="text"
            {...register("L")}
            required
            className="border p-3 w-full rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Gas flowrate (G):
          </label>
          <input
            type="text"
            {...register("G")}
            required
            className="border p-3 w-full rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Slope of equilibrium line (m):
          </label>
          <input
            type="text"
            {...register("m")}
            required
            className="border p-3 w-full rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 transition duration-300">
          Calculate
        </button>
      </form>
      {num_trays !== undefined && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Calculation Results:</h2>
          <p className="text-lg">
            <span className="font-semibold">Number of trays required:</span>{" "}
            {num_trays.toFixed(3)} ≈ {Math.ceil(num_trays)}
          </p>
          <p className="text-lg">
            <span className="font-semibold">
              x_n (conc. of A in liquid Outlet):
            </span>{" "}
            {x_n.toExponential(4)}
          </p>
          <p className="text-lg">
            <span className="font-semibold">
              X_n (conc. of A in liquid Outlet) on free basis:
            </span>{" "}
            {X_n.toExponential(4)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculatorAbsrorption;
