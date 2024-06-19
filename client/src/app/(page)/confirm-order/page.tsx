"use client";
import OrderForm from "@/components/orderCompo/order-form/OrderForm";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface OrderData {
  fullName: string;
  address: string;
  email: string;
  phoneNumber: number; // Use string if you want to handle phone number as a string
  occupation: string;
  description: string;
}
const loader = () => {
  return (
    <div>
     
    </div>
  );
};

const page = () => {
  const [orderData, setOrderData] = useState<OrderData>({
    fullName: "",
    address: "",
    email: "",
    phoneNumber: 0,
    occupation: "",
    description: "",
  });

  // get url query form data
  const themeID = useSearchParams().get("theme");

  // Get the current date
  const date = new Date();

  // Format the current date as dd/mm/yyyy
  const nowDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  // Calculate the expected delivery date (current date + 4 days)
  const expectedDate = new Date(date);
  expectedDate.setDate(date.getDate() + 4);

  // Format the expected delivery date as dd/mm/yyyy
  const formattedExpectedDate = `${expectedDate.getDate()}/${
    expectedDate.getMonth() + 1
  }/${expectedDate.getFullYear()}`;

  return (
    <div className="transition-all duration-1000">
      <section className="py-8 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Payment Overview
          </h2>
          <p className="mt-3 font-normal text-lg leading-8 text-gray-500 mb-8 text-center">
            Thanks for making a purchase you can check our order summary frm
            below
          </p>
          <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
              <div className="data">
                {/* <p className="font-semibold text-base leading-7 text-black">
                  Order Id:{" "}
                  <span className="text-indigo-600 font-medium">#10234987</span>
                </p> */}
                <div className="grid grid-cols-1 justify-center items-center gap-1.5 font-semibold text-base leading-7 text-black mt-4">
                  <p>Order Date :</p>
                  <hr />
                  <p className="text-gray-400 font-medium"> {nowDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1 justify-center items-center">
                <label
                  className="block font-semibold"
                  htmlFor="Choose Payment Method ?"
                >
                  Choose Payment Method ?
                </label>
                <select className="focus:border focus:border-red-400 ring-red-700 rounded-full py-4 px-6 font-semibold leading-7 text-white bg-gradient-to-r from-amber-500 to-pink-500 max-lg:mt-5 shadow-sm shadow-transparent duration-500 hover:bg-gradient-to-r hover:from-amber-600 hover:to-pink-700 transform transition  md:hover:scale-105 lg:hover:scale-110">
                  {/* <option disabled selected>
                    Choose Payment Method ?
                  </option> */}
                  <option
                    selected
                    defaultValue={"Bkash"}
                    className="text-black hover:bg-black hover:text-white"
                  >
                    Bkash
                  </option>
                  <option
                    value={"COD"}
                    className="text-black hover:bg-black hover:text-white"
                  >
                    Cash on delivery
                  </option>
                </select>
              </div>
            </div>
            <div className="w-full px-3 min-[400px]:px-6">
              <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                <div className="img-box grid justify-center max-lg:w-full">
                  <Image
                    width="400"
                    height="400"
                    alt="Profile Picture"
                    src="/web-demo.jpg"
                    className=" aspect-square text-center w-[200px] lg:max-w-[140px] rounded-xl"
                  />
                </div>
                <div className="flex flex-row items-center w-full ">
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                      <div className="">
                        <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                          Premium Personal Website
                        </h2>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-3 flex gap-3 items-center  ">
                         <span> Theme ID:  </span>
                         {themeID ? themeID :   <span className="bg-gray-300 w-20 h-4 rounded animate-pulse" ></span>}
                        </p>
                        {/* <div className="flex items-center ">
                          <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                            Size: <span className="text-gray-500">100 ml</span>
                          </p>
                          <p className="font-medium text-base leading-7 text-black ">
                            Qty: <span className="text-gray-500">2</span>
                          </p>
                        </div> */}
                      </div>
                    </div>
                    <div className="grid grid-cols-6  gap-3">
                      <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm leading-7 text-black">
                            Discount Price
                          </p>
                          <div className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                            <s>৳2000</s> ৳1499
                          </div>
                        </div>
                      </div>
                      <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                        <div className="flex gap-3 lg:block ">
                          <p className="font-medium text-sm leading-7 text-black">
                            Status
                          </p>
                          <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-red-50 text-red-600">
                            payment Pending
                          </p>
                        </div>
                      </div>
                      <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                            Expected Delivery
                          </p>
                          <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                            {formattedExpectedDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-col lg:flex-row items-center py-6 gap-6 w-full">
                <OrderForm orderData={orderData} setOrderData={setOrderData} />
              </div>
            </div>
            <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                <button className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-red-600">
                  <svg
                    className="stroke-black transition-all duration-500 group-hover:stroke-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  Cancel Order
                </button>
                <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                  Payment Method : <span className="text-gray-500">Bkash</span>
                </p>
              </div>
              <p className="font-semibold text-lg text-black py-6">
                Total Price: <span className="text-indigo-600"> ৳ 2000.00</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
