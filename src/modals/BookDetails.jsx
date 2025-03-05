// This is the modal that shows all of the details for a particular book. The details shown will differ depending on if we're in an Admin page or not.
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import AddIcon from "../assets/add.svg?react";
import EditIcon from "../assets/edit.svg?react";

export default function BookDetails({ bookData, imageSrc, onExit }) {
  const [audience, setAudience] = useState('');
  const [published, setPublished] = useState('');
  const [tags, setTags] = useState('');
  const [synopsis, setSynopsis] = useState('');

  console.log(bookData);
  const navigate = useNavigate();

  const jwtData = Cookies.get("jwtData");
  if (jwtData == null) {
    navigate("/login");
  }
  const isAdmin = JSON.parse(jwtData).userRole.roleType === "Admin";

  const title = bookData.title;
  const author = bookData.author;
  const series = bookData.series;
  const genre = bookData.genre;
  const isbn = bookData.isbn;

  const getExtraBookData = async () => {
    const jwt = Cookies.get("authToken");
    const result = await fetch(`http://localhost:8080/api/inventory/get/${isbn}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (result.ok) {
      const dataResponse = await result.json();
      const bookDataReturned = dataResponse.object;

      setAudience(bookDataReturned.audience_name);
      setPublished(bookDataReturned.publish_date);
      setTags(""); // TODO: Once the back-end supplies this data, add this in here
      setSynopsis(bookDataReturned.short_description);
    }
  };

  getExtraBookData();

  if (isAdmin) {
    return (
      <AnimatePresence>
        {
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onExit}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-4/6 max-w-5xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end items-center pl-4 pr-4 pt-2 pb-2 bg-darkBlue rounded-t-lg">
                <h2 className="flex-1 text-center text-white text-lg font-semibold">
                  {title}
                </h2>
                <button className="text-gray-600" onClick={onExit}>
                  Back
                </button>
              </div>
              <div className="flex flex-wrap justify-center">
                <img src={imageSrc} alt="Cover Image" className="p-6 h-96 max-h-fit" />
                <div className="p-6">
                  <div className="flex text-xl">
                    <h6 className="font-bold pr-2">Author:</h6>
                    <p>{author}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Series:</h6>
                    <p>{series}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Genre:</h6>
                    <p>{genre}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Recommended Age:</h6>
                    <p>{audience}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Published:</h6>
                    <p>{published}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Tags:</h6>
                    <p>{tags}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-wrap">
                <div className="p-6 pt-0 flex-1 min-w-72">
                  <h4 className="font-bold pr-2 text-xl">Synopsis:</h4>
                  <p>{synopsis}</p>
                </div>
                <div className="flex-1 p-4 pt-0">
                  <table className="table-auto w-full border-collapse rounded-lg">
                    <thead className="bg-lightBlue rounded-t-lg">
                      <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Campus</th>
                        <th className="px-4 py-2">Location</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      <tr>
                        <td className="px-4 py-2">2</td>
                        <td className="px-4 py-2">Salt Lake City</td>
                        <td className="px-4 py-2">Main Shelves</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="bg-white">
                  <AddIcon />
                </button>
                <button className="bg-white">
                  <EditIcon />
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence>
        {
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onExit}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-4/6 max-w-5xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end items-center pl-4 pr-4 pt-2 pb-2 bg-darkBlue rounded-t-lg">
                <h2 className="flex-1 text-center text-white text-lg font-semibold">
                  {title}
                </h2>
                <button className="text-gray-600" onClick={onExit}>
                  Back
                </button>
              </div>
              <div className="flex flex-wrap justify-center">
                <img
                  src={imageSrc}
                  alt="Cover Image"
                  className="p-6 max-w-full w-1/3 max-h-fit min-w-60 "
                />
                <div className="p-6">
                  <div className="flex text-xl">
                    <h6 className="font-bold pr-2">Author:</h6>
                    <p>{author}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Series:</h6>
                    <p>{series}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Genre:</h6>
                    <p>{genre}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Recommended Age:</h6>
                    <p>{audience}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Published:</h6>
                    <p>{published}</p>
                  </div>
                  <div className="flex text-xl pt-4">
                    <h6 className="font-bold pr-2">Tags:</h6>
                    <p>{tags}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <h4 className="font-bold pr-2 text-xl">Synopsis:</h4>
                <p>{synopsis}</p>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    );
  }
}
