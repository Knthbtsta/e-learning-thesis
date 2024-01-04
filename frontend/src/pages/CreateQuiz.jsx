import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const CreateQuiz = () => {
  const [formData, setFormData] = useState({
      quiz_id: '',
      title: '',
      category: '',
      date: '',
      items: [], // Update to an array
      totalitems: '',
  });

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = async () => {
      try {
          const lines = formData.word.split('\n');

          // Update 'items' to be an array of objects
          const itemsArray = lines.map(line => ({ word: line.trim() }));

          // Save data to MongoDB
          const response = await axios.post('http://localhost:8800/api/quiz', {
              quiz_id: formData.quiz_id,
              title: formData.title,
              category: formData.category,
              date: formData.date,
              items: itemsArray,
              totalitems: formData.totalitems,
          });

          console.log(response.data);
      } catch (error) {
          console.error('Error saving data:', error);
      }
  };
    
      return (
        <section className="bg-[url('/background2.png')] h-screen md:h-screen bg-no-repeat bg-cover">
          <>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
              <div className="max-w-xl mx-auto">
                <div className="mt-12">
                  <form className="bg-cyan-600 py-12 px-8 rounded-lg">
                    <div className="flex flex-col">
                      <h1 className="text-white text-2xl">Create a Quiz</h1>
                    </div>
                    <div className="grid gap-4 lg:gap-6 pt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                          <label htmlFor="quiz_id" className="block text-sm text-gray-700 font-medium dark:text-white">
                            Quiz ID
                          </label>
                          <input type="text" name="quiz_id" id='quiz_id' value={formData.quiz_id} onChange={handleChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                          />
                        </div>
                        <div>
                          <label htmlFor="title" className="block text-sm text-gray-700 font-medium dark:text-white">
                            Title
                          </label>
                          <input type="text" name="title" id='title' value={formData.title} onChange={handleChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                          <label htmlFor="category" className="block text-sm text-gray-700 font-medium dark:text-white">
                            Letter Category
                          </label>
                          <input type="text" name="category" id='category' value={formData.category} onChange={handleChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                          />
                        </div>
                        <div>
                          <label htmlFor="date" className="block text-sm text-gray-700 font-medium dark:text-white">
                            Date Created
                          </label>
                          <input type="text" name="date" id='date' value={formData.date} onChange={handleChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                          />
                        </div>
                        <div>
                          <label htmlFor="items" className="block text-sm text-gray-700 font-medium dark:text-white">
                            Items
                          </label>
                          <input type="text" name="items" id='items' value={formData.items} onChange={handleChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                          />
                        </div>
                        <div>
                          <label htmlFor="totalitems" className="block text-sm text-gray-700 font-medium dark:text-white">
                            Total items to show
                          </label>
                          <input type="text" name="totalitems" id='totalitems' value={formData.totalitems} onChange={handleChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                          />
                        </div>
                      </div>
                        <div>
                          <label htmlFor="password" className="block text-sm text-gray-700 font-medium dark:text-white">
                            Password
                          </label>
                          <textarea
                          name="word"
                        id='word'
                         value={formData.word}
                            onChange={handleChange}
                             rows="4"
                            cols="50"
                             className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                            />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-10">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex justify-center items-center gap-x-3 text-center bg-green-500 hover:bg-green-600 border border-transparent text-sm lg:text-base text-white font-medium rounded-md g-offset-white transition py-3 px-4"
                      >
                        Create Quiz
                      </button>
                      <Link
                        to="/temporary"
                        className="inline-flex justify-center items-center gap-x-3 text-center bg-red-500 hover:bg-red-600 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                      >
                        Return
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        </section>
      );
    };

export default CreateQuiz