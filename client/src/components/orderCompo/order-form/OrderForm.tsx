const OrderForm = () => {
  return (
    <div className="w-full border rounded-xl   p-4 md:p-8">
      <form className="flex justify-center items-center justify-items-center flex-wrap -m-3">
        <div className="w-full md:w-1/2 p-3">
          <label className="block">
            <input
              className="  px-4 py-4 w-full text-gray-700 font-semibold tracking-tight placeholder-gray-300 outline-none border border-gray-300 focus:border-indigo-400 rounded-lg transition duration-200"
              id="contactInput1-1"
              type="text"
              placeholder="Full Name"
            />
          </label>
        </div>
        <div className="w-full md:w-1/2 p-3">
          <label className="block">
            <input
              className="px-4 py-4 w-full text-gray-700 font-semibold tracking-tight placeholder-gray-300 outline-none border border-gray-300 focus:border-indigo-400 rounded-lg transition duration-200"
              id="contactInput1-2"
              type="address"
              placeholder="Address"
            />
          </label>
        </div>
        <div className="w-full md:w-1/2 p-3">
          <label className="block">
            <input
              className="px-4 py-4 w-full text-gray-700 font-semibold tracking-tight placeholder-gray-300 outline-none border border-gray-300 focus:border-indigo-400 rounded-lg transition duration-200"
              id="contactInput1-3"
              type="email"
              placeholder="Email Address"
            />
          </label>
        </div>
        <div className="w-full md:w-1/2 p-3">
          <label className="block">
            <input
              className="px-4 py-4 w-full text-gray-700 font-semibold tracking-tight placeholder-gray-300 outline-none border border-gray-300 focus:border-indigo-400 rounded-lg transition duration-200"
              id="contactInput1-4"
              type="number"
              placeholder="Phone Number"
            />
          </label>
        </div>
       
        <div className="w-full p-3">
          <select className="focus:border-gray-400 focus:border border border-gray-300 rounded-lg py-4 px-6  text-center font-semibold w-full selection:border-indigo-300 focus:ring-blue-500">
            <option disabled selected>
              What is your occupation?
            </option>
            <option>Business Owner</option>
            <option>Job Holder</option>
            <option>Freelancer</option>
            <option>Job Candidate</option>
            <option>Student</option>
          </select>
        </div>
        
        <div className="w-full lg:w-2/5 p-3">
          <a
            className="inline-block mb-4 px-4 py-3.5 w-full text-lg text-white text-center font-semibold tracking-tight bg-gradient-to-r from-amber-500 to-pink-600 hover:bg-gradient-to-r hover:from-amber-600 hover:to-pink-700 rounded-full focus:ring-4 focus:ring-pink-300 transform duration-500 transition  hover:scale-105 md:hover:scale-105"
            href="#"
          >
            Place Order
          </a>
          <span className="text-sm text-gray-600 tracking-tight">
            * We never share user details with third parties, period.
          </span>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
