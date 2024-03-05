import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import { parse } from "date-fns"
import config from "../../../config"

const Reports= () => {
    const baseUrl = config.BASE_URL
    const [data, setData] = useState([])
    const [dataEdit, setDataEdit] = useState([{}])

    const modalSkor = () => {
        alert('Beri Nilai')
    

    }

    function toggleModalEdit() {
        document.getElementById("modal-edit").classList.toggle("hidden");
        const skor = document.getElementById("skor");
        skor.value = '';
      }


      const handleSkor = (event) => {
        event.preventDefault();
        const skor = event.target.elements.skor.value;
        const id_user = event.target.elements['id-user'].value;
        const id_quiz = event.target.elements['id-quiz'].value;
        if (skor === '') {
          alert('Skor tidak boleh kosong')
          return
        } else if(isNaN(skor)) {
          alert('Skor harus berupa angka')
          return
        }else if (skor < 0 || skor > 100) {
          alert('Skor harus diantara 0 sampai 100')
          return
      } 
        
        fetch(`${baseUrl}/answers/skor`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id_user: parseInt(id_user),
                    id_quiz: parseInt(id_quiz),
                    skor: parseInt(skor),
                    
                }),
        })
        .then((response) => response.json())
        .then((responseData) => {
            
            if (responseData.message === 'jawaban_peserta updated') {
                alert('Skor berhasil diupdate')
                toggleModalEdit()
                fetchData()
            } else {
                alert('Gagal update skor')
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })
      }

      const fetchJawabanPesertaById = (id) => {
        fetch(`${baseUrl}/answers/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            
            if (responseData.message === 'success') {
                const jawabanPeserta = responseData.data
                
                const idJawabanPeserta = jawabanPeserta.id
                const idQuiz = jawabanPeserta.id_quiz
                const idUser = jawabanPeserta.id_user
                const skor = jawabanPeserta.skor
                setDataEdit({
                    idJawabanPeserta: idJawabanPeserta,
                    idQuiz: idQuiz,
                    idUser: idUser,
                    skor: skor
                })
              
                toggleModalEdit()
            } else {
                alert('Gagal mendapatkan data jawaban peserta')
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })
      
    }
    const fetchData = () => {
        fetch(`${baseUrl}/answer-users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            
            if (Array.isArray(responseData.data)) {
                setData(responseData.data)
            } else {
                console.error('Error: responseData is not an array')
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="flex h-screen">
        <Sidebar />
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
            
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nama
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Quiz
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Benar/Soal
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Skor
                      </th>
                      
                    
                    </tr>
                  </thead>

                  <tbody class="bg-white">
                  {data?.map((report) => {
                      return (
                        <React.Fragment key={report.id}>
                            <tr>
                      
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="flex items-center">
                          

                          <div class="ml-4">
                            <div class="text-sm font-medium leading-5 text-gray-900">
                              {report.user.nama}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 text-gray-500">
                          {report.quiz.judul}
                        </div>
                      </td>

                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                          {report.jumlah_benar}/{report.total_soal}
                          {/* {format(new Date(quiz.waktu_mulai), 'dd-MM-yy HH:mm')} */}
                        </span>
                      </td>
                     

                      <td class="flex items-center px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        {report.skor}
                      <button className="bg-green-500 text-white font-semibold ml-5" onClick={() => fetchJawabanPesertaById(report.id)}>
                        Beri Nilai
                      </button>
                       
                        
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
            <form onSubmit={handleSkor}>
             
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <input type="text" id="id-jawaban-peserta" name="id-jawaban-peserta" className="hidden" />
              <input type="text" id="id-quiz" name="id-quiz" value={dataEdit.idQuiz}
              onChange={(e) => setDataEdit({ ...dataEdit, idQuiz: e.target.value })}
              className="hidden" />
              <input type="text" id="id-user" 
              value={dataEdit.idUser}
            onChange={(e) => setDataEdit({ ...dataEdit, idUser: e.target.value })}
              name="id-user" className="hidden" />
                <label class="font-medium text-gray-800">Skor</label>
                <input
                  type="text"
                  name="skor"
                  id="skor"
                  value={dataEdit.skor}
                  onChange={(e) => setDataEdit({ ...dataEdit, skor: e.target.value })}
                  class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                />
                
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
        </div>
    )
}

export default Reports