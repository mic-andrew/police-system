import React from "react";
import { FaTimes } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CORE_BACKEND_URL } from "../utils";

const ImageModal = ({ suspect, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div
      className="bg-white p-4 rounded-lg max-w-3xl w-full flex flex-col items-center justify-center relative"
      style={{ height: "70vh" }}
    >
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-2xl font-bold">{suspect.name}'s Images</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
        >
          <FaTimes size={24} />
        </button>
      </div>
      <div className="h-5/6">
        <Carousel showThumbs={false} dynamicHeight={true}>
          {suspect.images.map((image, index) => (
            <div
              key={index}
              className="h-full flex items-center justify-center"
            >
              <img
                src={`${CORE_BACKEND_URL}/uploads/${image.filename}`}
                alt={`${suspect.name} - ${index + 1}`}
                className="max-h-full object-contain"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  </div>
);

export default ImageModal;
