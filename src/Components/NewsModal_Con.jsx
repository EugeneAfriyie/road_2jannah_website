import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

function NewsModal_Con({ isModalOpen, selectedNews, closeModal }) {
  if (!isModalOpen || !selectedNews) return null;

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFullMediaModalOpen, setIsFullMediaModalOpen] = useState(false);

  const nextMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % selectedNews.media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + selectedNews.media.length) % selectedNews.media.length);
  };

  const openFullMediaModal = () => {
    setIsFullMediaModalOpen(true);
  };

  const closeFullMediaModal = () => {
    setIsFullMediaModalOpen(false);
  };

  // Split description into paragraphs (simple split on periods)
  const paragraphs = selectedNews.description.split('. ').map((para, index) => (
    <p key={index} className="text-gray-700 mb-2">
      {para.trim()}.
    </p>
  ));

  const renderMedia = (mediaItem, isFullScreen = false) => {
    if (mediaItem.type === "image") {
      return (
        <img
          src={mediaItem.src}
          alt={mediaItem.alt}
          className={`w-full ${isFullScreen ? "h-full object-contain" : "h-48 object-cover"} rounded-lg mb-4 cursor-pointer`}
          onClick={openFullMediaModal}
        />
      );
    } else if (mediaItem.type === "video") {
      return (
        <video
          src={mediaItem.src}
          controls
          className={`w-full ${isFullScreen ? "h-full object-contain" : "h-48 object-cover"} rounded-lg mb-4 cursor-pointer`}
          onClick={openFullMediaModal}
        />
      );
    } else if (mediaItem.type === "facebook-video") {
      return (
        <iframe
          src={`https://www.facebook.com/plugins/video.php?height=314&href=${(mediaItem.src)}&show_text=false&width=560&t=0`}

          
          className={`w-full ${isFullScreen ? "h-[80vh]" : "h-48"} rounded-lg mb-4`}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>

        
      );
    }
    return null;
  };

  return (
    <>
      {/* Main News Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative max-h-[90vh] overflow-y-auto">
          <div className="flex justify-end cursor-pointer mb-3">
            <button onClick={closeModal} className=" top-2 right-2 text-white bg-red-500 hover:bg-red-700 hover:scale-110 transition duration-300  text-xl">
             <svg
                className="w-6 sm:w-8 h-6 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
          </button>
          </div>
          <div className="relative">
            {renderMedia(selectedNews.media[currentMediaIndex])}
            {selectedNews.media.length > 1 && (
              <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-2">
                <button
                  onClick={prevMedia}
                  className="text-white hover:text-teal-200 text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextMedia}
                  className="text-white hover:text-teal-200 text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
            {selectedNews.media.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                {currentMediaIndex + 1} / {selectedNews.media.length}
              </div>
            )}
          </div>
         <div className="flex justify-between items-center mb-4">

          <div className="">
           <p className="text-xs bg-teal-200 inline-block px-2 py-1 text-teal-800 font-bold mb-2">{selectedNews.category}</p>
          <p className="text-xs text-gray-600 mb-2" >{selectedNews.date}</p>
         </div>

        

         {selectedNews.externalLink && (

         <button className='text-xs bg-teal-200 inline-block p-2 text-teal-800 font-bold'>
          <a href={selectedNews.followLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <p className="text-[.9rem] text-gray-600 ">Read more</p>
          </a>
         </button>

         )}
         </div>
          <h3 className="text-xl font-bold text-teal-800 mb-2">{selectedNews.title}</h3>
          {paragraphs}
        </div>
      </div>

      {/* Full-Screen Media Modal */}
      {isFullMediaModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
            <button
              onClick={closeFullMediaModal}
              className="absolute top-4 right-4 text-white hover:text-teal-200 text-2xl"
            >
              <X />
            </button>
          <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
          
            {renderMedia(selectedNews.media[currentMediaIndex], true)}
            {selectedNews.media.length > 1 && selectedNews.media[currentMediaIndex].type !== "facebook-video" && (
              <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
                <button
                  onClick={prevMedia}
                  className="text-white hover:text-teal-200 text-3xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextMedia}
                  className="text-white hover:text-teal-200 text-3xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
            {selectedNews.media.length > 1 && selectedNews.media[currentMediaIndex].type !== "facebook-video" && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                {currentMediaIndex + 1} / {selectedNews.media.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NewsModal_Con