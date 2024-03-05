import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import editSvg from "../../assets/edit.svg";
import deleteSvg from "../../assets/delete.svg";
import config from "../../../config";

function convertJawabanBenar(jawaban) {
  if (jawaban === 1) {
    return "a";
  } else if (jawaban === 2) {
    return "b";
  } else if (jawaban === 3) {
    return "c";
  } else {
    return "d";
  }

}
const DetailQuiz = () => {
  const id = window.location.pathname.split("/").pop();
  const [quiz, setQuiz] = useState({});
  const baseUrl = config.BASE_URL;
  const token = localStorage.getItem("token");
  const [activeOption, setActiveOption] = useState(null);
  const [activeOptionEdit, setActiveOptionEdit] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleCheckboxChange = (option) => {
    setActiveOption(option);
    
  };

  const handleCheckboxChangeEdit = (option) => {
    setActiveOptionEdit(option);
    
  }

  const fetchQuiz = () => {
    fetch(`${baseUrl}/quizzes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
      
        if (data.data.waktu_mulai) {
          setStartDate(new Date(data.data.waktu_mulai));
        }
        if (data.data.waktu_selesai) {
          setEndDate(new Date(data.data.waktu_selesai));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchQuestions = () => {
    axios
      .get(`${baseUrl}/questions/quiz/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
       
        setQuestions(response.data.data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function toggleModal() {
    document.getElementById("modal").classList.toggle("hidden");
  }

  function toggleModalEdit() {
    document.getElementById("modal-edit").classList.toggle("hidden");
  }

  const handlePertanyaan = (e) => {
    e.preventDefault();
    const idQuiz = quiz.data?.id;
    const pertanyaan = e.target.pertanyaan.value;
    const jawaban1 = e.target.jawaban1.value;
    const jawaban2 = e.target.jawaban2.value;
    const jawaban3 = e.target.jawaban3.value;
    const jawaban4 = e.target.jawaban4.value;
    const stringJawaban = `${jawaban1}~&${jawaban2}~&${jawaban3}~&${jawaban4}`;
    const jawabanBenar = activeOption;
    const data = {
      pertanyaan: pertanyaan,
      opsi_jawaban: stringJawaban,
      jawaban_benar: jawabanBenar,
      id_quiz: idQuiz,
    };
    axios
      .post(`${baseUrl}/questions`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Pertanyaan berhasil ditambahkan");
        fetchQuestions();
        toggleModal();
        e.target.pertanyaan.value = "";
        e.target.jawaban1.value = "";
        e.target.jawaban2.value = "";
        e.target.jawaban3.value = "";
        e.target.jawaban4.value = "";
        setActiveOption(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePertanyaanEdit = (e) => {
   
    e.preventDefault();
    const newQuestionId = e.target['id-question'].value;
   
    const pertanyaan = e.target['pertanyaan-edit'].value;
    const jawaban1 = e.target['jawaban1-edit'].value;
    const jawaban2 = e.target['jawaban2-edit'].value;
    const jawaban3 = e.target['jawaban3-edit'].value;
    const jawaban4 = e.target['jawaban4-edit'].value;
    const stringJawaban = `${jawaban1}~&${jawaban2}~&${jawaban3}~&${jawaban4}`;
    
    const intId = parseInt(id);
    const jawabanBenar = activeOptionEdit;
    const data = {
      pertanyaan: pertanyaan,
      opsi_jawaban: stringJawaban,
      jawaban_benar: jawabanBenar,
      id_quiz: intId,
    }
  
    axios
      .put(`${baseUrl}/questions/${newQuestionId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Pertanyaan berhasil diubah");
        fetchQuestions();
        toggleModalEdit();
      })
      .catch((error) => {
        alert(error)
        console.error("Error:", error);
      });
  }

  const deleteQuestion = (id, event) => {
    event.preventDefault();
    if(window.confirm("Apakah anda yakin ingin menghapus pertanyaan ini?")) {
      axios
      .delete(`${baseUrl}/questions/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
       
        alert("Pertanyaan berhasil dihapus");
        fetchQuestions();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    } 
   
  
  }

  const fetchQuestion = (event, idQuestion) => {
    event.preventDefault();
    axios
      .get(`${baseUrl}/questions/${idQuestion}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
      
        const data = response.data.data;
        document.getElementById("pertanyaan-edit").value = data.pertanyaan;
        document.getElementById("id-question").value = data.id;
        
        const opsiJawaban = data.opsi_jawaban.split("~&");
        document.getElementById("jawaban1-edit").value = opsiJawaban[0];
        document.getElementById("jawaban2-edit").value = opsiJawaban[1];
        document.getElementById("jawaban3-edit").value = opsiJawaban[2];
        document.getElementById("jawaban4-edit").value = opsiJawaban[3];
        setActiveOptionEdit(data.jawaban_benar);
        toggleModalEdit();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchQuiz();
    fetchQuestions();
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-2xl leading-6 font-semibold text-gray-900">
            Detail Quiz
          </h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-semibold text-gray-500">Title</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {quiz.data?.judul}
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-semibold text-gray-500">Description</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {quiz.data?.deskripsi}
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-semibold text-gray-500">Start Date</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                  {format(new Date(startDate), "dd-MM-yy HH:mm")}
                </span>
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-semibold text-gray-500">End Date</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                  {format(new Date(endDate), "dd-MM-yy HH:mm")}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="py-5">
        <p className="text-lg font-semibold">List Pertanyaan</p>
        <button
          onClick={toggleModal}
          className="bg-indigo-500 text-white font-semibold text-md mt-4 hover:bg-indigo-700"
        >
          Tambah Pertanyaan
        </button>
        <table class="min-w-full my-5">
          <thead>
            <tr>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Pertanyaan
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Jawaban Benar
              </th>
             

              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Action
              </th>
            </tr>
          </thead>

          <tbody class="bg-white">
            {questions?.map((question) => {
              return (
                <React.Fragment key={question.id}>
                  <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium leading-5 text-gray-900">
                            {question.pertanyaan}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="text-sm leading-5 text-gray-500">
                        
                      {convertJawabanBenar(question.jawaban_benar)}
                      </div>
                    </td>

                    

                    <td class="flex items-center px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      
                      <a
                        
                        onClick={(event) => fetchQuestion(event, question.id)}
                        className="mx-2 cursor-pointer"
                      >
                        <img
                          src={editSvg}
                          width={24}
                          alt=""
                          title="edit pertanyaan"
                        />
                      </a>
                      <a
                        href=""
                        onClick={(event) => deleteQuestion(question.id, event)}
                      >
                        <img
                          src={deleteSvg}
                          width={24}
                          alt=""
                          title="delete pertanyaan"
                        />
                      </a>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
        id="modal-edit"
      >
        <div class="flex items-center justify-center min-height-[100vh] pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <div
            class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[70vw] sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <form onSubmit={handlePertanyaanEdit}>
             
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <input type="text" id="id-question" name="id-question" className="hidden" />
                <label class="font-medium text-gray-800">Pertanyaan</label>
                <input
                  type="text"
                  name="pertanyaan-edit"
                  id="pertanyaan-edit"
                  class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                />
                <div className="col-span-2">
                  <label class="font-medium text-gray-800">Opsi Jawaban</label>
                  <div className="flex items-center">
                    <input
                      id="option1-edit"
                      name="option1-edit"
                      type="checkbox"
                      checked={activeOptionEdit === 1}
                      onChange={() => handleCheckboxChangeEdit(1)}
                      value=""
                      class="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    <input
                      type="text"
                      id="jawaban1-edit"
                      name="jawaban1-edit"
                      class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="option2-edit"
                      type="checkbox"
                      name="option2-edit"
                      checked={activeOptionEdit === 2}
                      onChange={() => handleCheckboxChangeEdit(2)}
                      value=""
                      class="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    <input
                      type="text"
                      id="jawaban2-edit"
                      name="jawaban2-edit"
                      class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="option3-edit"
                      name="option3-edit"
                      type="checkbox"
                      value=""
                      checked={activeOptionEdit === 3}
                      onChange={() => handleCheckboxChangeEdit(3)}
                      class="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    <input
                      type="text"
                      id="jawaban3-edit"
                      name="jawaban3-edit"
                      class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="option4-edit"
                      name="option4-edit"
                      type="checkbox"
                      value=""
                      checked={activeOptionEdit === 4}
                      onChange={() => handleCheckboxChangeEdit(4)}
                      class="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    <input
                      type="text"
                      id="jawaban4-edit"
                      name="jawaban4-edit"
                      class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                  </div>
                </div>
              </div>
              <div class="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={toggleModalEdit}
                >
                  <i class="fas fa-times"></i> Cancel
                </button>
                <button
                  type="submit"
                  class="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
                >
                  <i class="fas fa-plus"></i> Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
        id="modal"
      >
        <div class="flex items-center justify-center min-height-[100vh] pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <div
            class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[70vw] sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <form onSubmit={handlePertanyaan}>
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label class="font-medium text-gray-800">Pertanyaan</label>
                <input
                  type="text"
                  name="pertanyaan"
                  id="pertanyaan"
                  class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                />
                <div className="col-span-2">
                  <label class="font-medium text-gray-800">Opsi Jawaban</label>
                  <div className="flex items-center">
                    <input
                      id="option1"
                      name="option1"
                      type="checkbox"
                      checked={activeOption === 1}
                      onChange={() => handleCheckboxChange(1)}
                      value=""
                      class="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    <input
                      type="text"
                      id="jawaban1"
                      name="jawaban1"
                      class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="option2"
                      type="checkbox"
                      name="option2"
                      checked={activeOption === 2}
                      onChange={() => handleCheckboxChange(2)}
                      value=""
                      class="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    <input
                      type="text"
                      id="jawaban2"
                      name="jawaban2"
                      class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="option3"
                      name="option3"
                      type="checkbox"
                      value=""
                      checked={activeOption === 3}
                      onChange={() => handleCheckboxChange(3)}
                      class="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    <input
                      type="text"
                      id="jawaban3"
                      name="jawaban3"
                      class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="option4"
                      name="option4"
                      type="checkbox"
                      value=""
                      checked={activeOption === 4}
                      onChange={() => handleCheckboxChange(4)}
                      class="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    <input
                      type="text"
                      id="jawaban4"
                      name="jawaban4"
                      class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                  </div>
                </div>
              </div>
              <div class="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={toggleModal}
                >
                  <i class="fas fa-times"></i> Cancel
                </button>
                <button
                  type="submit"
                  class="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
                >
                  <i class="fas fa-plus"></i> Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailQuiz;
