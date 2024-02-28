
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {format} from 'date-fns';
import eyeSvg from "../../assets/eye-svgrepo-com.svg";
import editSvg from "../../assets/edit.svg";
import deleteSvg from "../../assets/delete.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080/v1/quizzes";
  const token = localStorage.getItem("token");
  const [quizzes, setQuizzes] = useState([]);
  const redirectToCreateQuiz = () => {
    navigate("/dashboard/create-quiz");
  };

  const getQuizzes = () => {
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
        if (Array.isArray(responseData.data)) {
          setQuizzes(responseData.data);
        } else {
          console.error("Error: responseData is not an array");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteQuiz = (id,event) => {
    
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Quiz deleted successfully");
          getQuizzes();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } 

  
  }

  const clickToEdit = (event,id) => {
    event.preventDefault();
    navigate(`/dashboard/edit-quiz/${id}`);
  
  }

  const navigateToDetail = (event, id) => {
    event.preventDefault();
    navigate(`/dashboard/detail-quiz/${id}`);
  
  }
  useEffect(() => {
    getQuizzes();
  }, []);

  quizzes.map((quiz) => {
    console.log(quiz);
  })

  return (
    <div className="flex h-screen">
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
            
            <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
              <a
                href="#"
                class="inline-block w-full h-full px-3 py-2 font-bold text-white"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </a>
            </li>
            <li class="mb-2 bg-gray-800 rounded shadow">
              <a
                href="#"
                class="inline-block w-full h-full px-3 py-2 font-bold text-white"
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
              </a>
            </li>
            <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
              <a
                href="#"
                class="inline-block w-full h-full px-3 py-2 font-bold text-white"
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
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full px-4 py-2 bg-gray-200 lg:w-full">
        <div class="container mx-auto mt-12">
          <div class="grid gap-4 lg:grid-cols-3">
            <div class="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
              <div class="p-3 bg-indigo-600 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div class="mx-4">
                <h4 class="text-2xl font-semibold text-gray-700">100</h4>
                <div class="text-gray-500">All Users</div>
              </div>
            </div>
            <div class="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
              <div class="p-3 bg-indigo-600 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <div class="mx-4">
                <h4 class="text-2xl font-semibold text-gray-700">30</h4>
                <div class="text-gray-500">All Blogs</div>
              </div>
            </div>
          </div>
          <div class="flex flex-col mt-8">
            <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <button
                  className="bg-indigo-500 my-5 font-semibold text-white hover:bg-indigo-700"
                  onClick={redirectToCreateQuiz}
                >
                  Create Quiz
                </button>
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Title
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Description
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Start Date
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        End Date
                      </th>
                      
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody class="bg-white">
                  
                    {quizzes?.map((quiz) => {
                      return (
                        <React.Fragment key={quiz.id}>
                    <tr>
                      
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="flex items-center">
                              

                              <div class="ml-4">
                                <div class="text-sm font-medium leading-5 text-gray-900">
                                  {quiz.judul}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-500">
                              {quiz.deskripsi}
                            </div>
                          </td>

                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                              
                              {format(new Date(quiz.waktu_mulai), 'dd-MM-yy HH:mm')}
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                              
                              {format(new Date(quiz.waktu_selesai), 'dd-MM-yy HH:mm')}
                            </span>
                          </td>

                          <td class="flex items-center px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                          <a href="" onClick={(event) => navigateToDetail(event, quiz.id)}><img title="detail" width={24} src={eyeSvg} alt="" /></a>
                          <a href="" onClick={(event) => clickToEdit(event, quiz.id)} className="mx-2"><img src={editSvg} width={24} alt="" title="edit quiz" /></a>
                          <a href="" onClick={(event) => deleteQuiz(quiz.id, event)}><img src={deleteSvg} width={24} alt="" title="delete data" /></a> 
                           
                            
                          </td>
                          
                        
                    </tr>
                    </React.Fragment>
                      );
                        
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
