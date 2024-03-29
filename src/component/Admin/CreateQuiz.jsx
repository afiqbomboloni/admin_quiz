import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import config from "../../../config";

const CreateQuiz = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const baseUrl = config.BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const description = e.target.description.value;
  const start_date = startDate;
  const end_date = endDate;
  const data = {
    judul: title,
    deskripsi: description,
    waktu_mulai: start_date,
    waktu_selesai: end_date,
  };
  fetch(`${baseUrl}/quizzes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      
      alert("Quiz created successfully")
      navigate("/");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <form onSubmit={handleSubmit}>
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900 text-[2em]">
              Create New Quiz
            </h2>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
                <label
                  for="title"
                  class="block text-sm font-medium leading-6 text-gray-900 text-xl"
                >
                 Title Quiz
                </label>
                <div class="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="title"
                    autocomplete="title"
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="col-span-full">
                <label
                  for="description"
                  class="block text-sm font-medium leading-6 text-gray-900 text-xl"
                >
                  Description
                </label>
                <div class="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  ></textarea>
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about this quiz.
                </p>
              </div>
              <div className="col-span-full">
              <label
                  for="start-date"
                  class="block text-sm font-medium leading-6 text-gray-900 text-xl"
                >
                  Start Date
                </label>
                <div class="mt-2">
                  <ReactDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    placeholderText="Select date and time"
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                  </div>
              </div>
              <div className="col-span-full">
              <label
                  for="end-date"
                  class="block text-sm font-medium leading-6 text-gray-900 text-xl"
                >
                  End Date
                </label>
                <div class="mt-2">
                  <ReactDatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    placeholderText="Select date and time"
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
