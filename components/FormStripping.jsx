"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

const CalculatorStripping = () => {
  const [num_trays, setNumTrays] = useState();
  const [y_1, sety_1] = useState();
  const [Y_1, setY_1] = useState();

  const { handleSubmit, register } = useForm();
  const onSubmit = (values) => {
    const mode = Number(values.mode);
    const x_o = Number(values.x_o);
    const x_n = Number(values.x_n);
    const y_n_1 = Number(values.y_n_1);
    const L = Number(values.L);
    const G = Number(values.G);
    const m = Number(values.m);

    const X_o = x_o / (1 - x_o);
    const Y_n_1 = y_n_1 / (1 - y_n_1);
    const X_n = x_n / (1 - x_n);
    const Ls = L * (1 - x_o);
    const Gs = G * (1 - y_n_1);
    const A = Ls / (m * Gs);
    const Y_1 = Y_n_1 - (Ls / Gs) * (X_n - X_o);
    const y_1 = Y_1 / (1 + Y_1);

    let num_trays;

    if (A === 1) {
      num_trays = (X_o - X_n) / (X_n - Y_n_1 / m);
    } else {
      num_trays =
        Math.log(((X_o - Y_n_1 / m) / (X_n - Y_n_1 / m)) * (1 - A) + A) /
        Math.log(1 / A);
    }
    setNumTrays(num_trays);
    sety_1(y_1);
    setY_1(Y_1);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Stripping Tray Calculation
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
            x_n (conc. of A in outlet liquid):
          </label>
          <input
            type="text"
            {...register("x_n")}
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
              y_1 (conc. of A in gas Outlet):
            </span>{" "}
            {y_1.toExponential(4)}
          </p>
          <p className="text-lg">
            <span className="font-semibold">
              Y_1 (conc. of A in gas Outlet) on free basis:
            </span>{" "}
            {Y_1.toExponential(4)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculatorStripping;
