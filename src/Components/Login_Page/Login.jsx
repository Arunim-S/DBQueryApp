import React, { useState } from "react";
import Nav from "../Navbar/Nav";
const Login = ({ login, instance }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
 * Handler function for updating the email state when the email input changes.
 * @param {Object} e - The event object.
 */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
 * Handler function for updating the password state when the password input changes.
 * @param {Object} e - The event object.
 */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
 * Submit handler function for handling form submission.
 * @param {Object} e - The event object.
 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(instance)
      const result = await instance.acquireTokenByUsernamePassword({
        scopes: ['openid', 'profile', 'offline_access'],
        email,
        password,
      });

      // Handle successful authentication
      console.log('Token acquired:', result);
    } catch (error) {
      console.error('Login failed: ', error);
    }
  };

  return (
    <div className="bg-black opacity-[88%] w-full min-h-screen">
      {/* <Nav /> */}
      <Nav login={login} />
      <div className="flex flex-col pt-16 text-white gap-6 justify-center items-center">
        <p className="text-2xl">Sign up</p>
        <p className="text-xs text-center">
          Empower your experience with our DB Query Application.
        </p>
        <form
          onSubmit={handleSubmit}
          className="gap-4 text-black w-full max-w-lg mx-auto"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-input mt-1 block w-full rounded-[1rem] p-3"
              placeholder="ex. email@domain.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-10">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input mt-1 block w-full rounded-[1rem] p-3"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="text-center gap-8 flex flex-col">
            <button
              type="submit"
              className="bg-[#005AC9] hover:bg-opacity-70 text-white font-semibold p-2 w-full rounded-[2rem]"
            >
              Get started
            </button>
            <p className="text-lg text-center text-white">
              Already have an account?{" "}
              <span className="text-[#005AC9]">Login</span>
            </p>
            <p className="text-center opacity-50 text-white">
              Or better yet...
            </p>
            <button
              type="submit"
              className="bg-white flex opacity-[73%] hover:bg-opacity-70 text-black font-semibold justify-center gap-4 p-3 w-full rounded-[2rem]"
              onClick={(e) => {
                login();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 -28.5 256 256"
                version="1.1"
              >
                <title>path21</title>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path
                    d="M118.431947,187.698037 C151.322003,181.887937 178.48731,177.08008 178.799309,177.013916 L179.366585,176.893612 L148.31513,139.958881 C131.236843,119.644776 117.26369,102.945381 117.26369,102.849118 C117.26369,102.666861 149.32694,14.3716012 149.507189,14.057257 C149.567455,13.952452 171.38747,51.62411 202.400338,105.376064 C231.435152,155.699606 255.372949,197.191547 255.595444,197.580359 L255.999996,198.287301 L157.315912,198.274572 L58.6318456,198.261895 L118.431947,187.698073 L118.431947,187.698037 Z M-4.03864498e-06,176.434723 C-4.03864498e-06,176.382721 14.631291,150.983941 32.5139844,119.992969 L65.0279676,63.6457518 L102.919257,31.8473052 C123.759465,14.3581634 140.866667,0.0274832751 140.935253,0.00062917799 C141.003839,-0.0247829554 140.729691,0.665213042 140.326034,1.53468179 C139.922377,2.40415053 121.407304,42.1170321 99.1814268,89.7855264 L58.7707514,176.455514 L29.3853737,176.492355 C13.2234196,176.512639 -4.03864498e-06,176.486664 -4.03864498e-06,176.434703 L-4.03864498e-06,176.434723 Z"
                    fill="#0089D6"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
              Continue with Azure
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
