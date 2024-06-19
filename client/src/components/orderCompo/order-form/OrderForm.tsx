"use client";
import { FC, FormEvent, useState } from "react";

const OrderForm: FC = () => {
  // state
  const [orderData, setOrderData] = useState({
    fullName: "",
    address: "",
    email: "",
    phoneNumber: 0,
    occupation: "",
    description: "",
  });

  const orderSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullName, address, email, phoneNumber, occupation, description } = e.target as typeof e.target & {
      fullName: { value: string };
      address: { value: string };
      email: { value: string };
      phoneNumber: { value: string };
      occupation: { value: string };
      description: { value: string };
    };

    const updatedOrderData = {
      fullName: fullName.value,
      address: address.value,
      email: email.value,
      phoneNumber: parseInt(phoneNumber.value),
      occupation: occupation.value,
      description: description.value,
    };

    setOrderData(updatedOrderData);

    // Log the updated order data
    console.log(updatedOrderData);
  };

  console.log({ out: orderData });

  return (
    <div className="w-full border rounded-xl p-4 md:p-8">
      <form
        onSubmit={orderSubmit}
        className="flex justify-center items-center justify-items-center flex-wrap -m-3"
      >
        <div className="w-full md:w-1/2 p-3">
          <label className="block">
            <input
              className="px-4 py-4 w-full text-gray-700 font-semibold tracking-tight placeholder-gray-300 outline-none border border-gray-300 focus:border-indigo-400 rounded-lg transition duration-200"
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Full Name"
            />
          </label>
        </div>
        <div className="w-full md:w-1/2 p-3">
          <label className="block">
            <input
              className="px-4 py-4 w-full text-gray-700 font-semibold tracking-tight placeholder-gray-300 outline-none border border-gray-300 focus:border-indigo-400 rounded-lg transition duration-200"
              id="address"
              name="address"
              type="text"
              placeholder="Address"
            />
          </label>
        </div>
        <div className="w-full md:w-1/2 p-3">
          <label className="block">
            <input
              className="px-4 py-4 w-full text-gray-700 font-semibold tracking-tight placeholder-gray-300 outline-none border border-gray-300 focus:border-indigo-400 rounded-lg transition duration-200"
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email Address"
            />
          </label>
        </div>
        <div className="w-full md:w-1/2 p-3">
          <label className="block">
            <input
              className="px-4 py-4 w-full text-gray-700 font-semibold tracking-tight placeholder-gray-300 outline-none border border-gray-300 focus:border-indigo-400 rounded-lg transition duration-200"
              id="phoneNumber"
              name="phoneNumber"
              type="number"
              required
              placeholder="Phone Number"
            />
          </label>
        </div>
        <div className="w-full p-3">
          <select
            id="occupation"
            name="occupation"
            required
            defaultValue=""
            className="focus:border-gray-400 focus:border border border-gray-300 rounded-lg py-4 px-6 text-center font-semibold w-full selection:border-indigo-300 focus:ring-blue-500"
          >
            <option disabled value="">
              What is your occupation?
            </option>
            <option value="Business Owner">Business Owner</option>
            <option value="Job Holder">Job Holder</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Job Candidate">Job Candidate</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <div className="w-full p-3">
          <textarea
            id="description"
            name="description"
            placeholder="Description of your occupation"
            className="focus:border-gray-400 focus:border border border-gray-300 rounded-lg py-4 px-6 text-center font-semibold w-full selection:border-indigo-300 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <div className="w-full lg:w-2/5 p-3">
          <button
            className="inline-block mb-4 px-4 py-3.5 w-full text-lg text-white text-center font-semibold tracking-tight bg-gradient-to-r from-amber-500 to-pink-600 hover:bg-gradient-to-r hover:from-amber-600 hover:to-pink-700 rounded-full focus:ring-4 focus:ring-pink-300 transform duration-500 transition hover:scale-105 md:hover:scale-105"
            type="submit"
          >
            Pay Now
          </button>
          <span className="text-sm text-gray-600 tracking-tight">
            * We never share user details with third parties, period.
          </span>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
