import React, {useState} from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to the server
    console.log("Email:", email);
    console.log("Password:", password);
    // You can add more validation and submission logic here
  };
  return (
    <div className="bg-black opacity-[88%] w-full h-screen">
      <div className="flex flex-col h-full text-white gap-6 justify-center items-center">
        <p className="text-5xl">Sign up</p>
        <p>Empower your experience with our DB Query Application,</p>
        <form onSubmit={handleSubmit} className="w-full gap-4 max-w-sm mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-input mt-1 block w-full rounded-lg p-4"
              placeholder="ex. email@domain.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input mt-1 block w-full rounded-lg p-4"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
