import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [linkIsActive, setLinkIsActive] = useState(true);
  const [linkIsActive2, setLinkIsActive2] = useState(true);

  console.log(linkIsActive);
  console.log(linkIsActive2);


  return (
    <div class="px-4 py-2 bg-gray-200 bg-indigo-600 lg:w-1/4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline w-8 h-8 text-white lg:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <div class="hidden lg:block">
          <div class="my-2 mb-6">
            <h1 class="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <ul>
            
            
            <li class="mb-2 bg-gray-800 rounded shadow">
              <Link
                to="/"
                onClick={() => {setLinkIsActive(!linkIsActive); setLinkIsActive2(false);} }
                class="{linkIsActive ? 'bg-gray-800' : 'bg-gray-700'} inline-block w-full h-full px-3 py-2 font-bold text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-block w-6 h-6 mr-2 -mt-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Quiz
              </Link>
            </li>
            <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
              <Link
                to="/reports"
                onClick={() => {setLinkIsActive2(!linkIsActive2); setLinkIsActive(false);}}
                class="{linkIsActive2 ? 'bg-gray-800' : 'bg-gray-700'} inline-block w-full h-full px-3 py-2 font-bold text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-block w-6 h-6 mr-2 -mt-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Reports
              </Link>
            </li>
          </ul>
        </div>
      </div>
  );
}

export default Sidebar