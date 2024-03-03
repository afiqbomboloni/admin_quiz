
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {format} from 'date-fns';
import eyeSvg from "../../assets/eye-svgrepo-com.svg";
import editSvg from "../../assets/edit.svg";
import deleteSvg from "../../assets/delete.svg";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080/v1/quizzes?isNotExpired=false";
  const token = localStorage.getItem("token");
  const [quizzes, setQuizzes] = useState([]);
  const redirectToCreateQuiz = () => {
    navigate("/create-quiz");
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
    navigate(`/edit-quiz/${id}`);
  
  }

  const navigateToDetail = (event, id) => {
    event.preventDefault();
    navigate(`/detail-quiz/${id}`);
  
  }
  useEffect(() => {
    getQuizzes();
  }, []);

  quizzes.map((quiz) => {
    console.log(quiz);
  })

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div class="w-full px-4 py-2 bg-gray-200 lg:w-full">
        <div class="container mx-auto mt-12">
          <div class="grid gap-4 lg:grid-cols-3">
           
            
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
