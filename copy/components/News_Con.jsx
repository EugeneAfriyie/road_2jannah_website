function News_Con({ featuredNews, news, openModal, updateFeaturedNews }) {
  // Function to truncate description to 20 words
  const truncateDescription = (text) => {
    const words = text.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return text;
  };

  // Function to split description into paragraphs
  const splitDescription = (text) => {
    return text.split('. ').map((para, index) => (
      <p key={index} className="text-sm mb-1">
        {para.trim()}.
      </p>
    ));
  };

  const renderFeaturedMedia = (mediaItem) => {
    if (mediaItem.type === "image") {
      return (
        <img
          src={mediaItem.src}
          alt={mediaItem.alt}
          className="w-full h-[500px] object-cover object-top transition duration-300 group-hover:scale-105 group-hover:brightness-75"
        />
      );
    } else if (mediaItem.type === "video") {
      return (
        <video
          src={mediaItem.src}
          className="w-full h-[500px] object-cover object-top transition duration-300 group-hover:scale-105 group-hover:brightness-75"
          muted
          autoPlay
          loop
        />
      );
    }
    return null;
  };

  return (
    <div id="news" className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-teal-800 mb-6">Latest News</h2>
      <p className="text-center text-gray-700 mb-6">Stay updated with our recent activities and impact.</p>
      <div className="grid md:grid-cols-3 gap-6 h-[500px]">
        {featuredNews && (
          <div className="md:col-span-2 relative bg-gray-100 rounded-lg overflow-hidden shadow-md group">
            {renderFeaturedMedia(featuredNews.media[0])}
            <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-6 w-full transition duration-300 group-hover:-translate-y-2">
              <p className="text-sm bg-teal-200 inline-block px-2 py-1 text-teal-800 font-bold mb-2">{featuredNews.category}</p>
              <p className="text-xs mb-1">{featuredNews.date}</p>
              <h3 className="text-xl font-bold">{featuredNews.title}</h3>
              {featuredNews.description.split(' ').length > 20 ? (
                splitDescription(truncateDescription(featuredNews.description))
              ) : (
                <p className="mt-2 text-sm">{featuredNews.description}</p>
              )}
              <button
                onClick={() => openModal(featuredNews)}
                className="mt-4 text-teal-600 font-semibold hover:text-teal-500"
              >
                → Read More
              </button>
            </div>
          </div>
        )}
        {news.length > 1 && (
          <div className="space-y-4 max-h-[100%] overflow-y-auto pr-2">
            {news.map((item, index) =>
              item !== featuredNews && (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md hover:bg-teal-50 transition animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <p className="text-xs bg-teal-200 inline-block px-2 py-1 text-teal-800 font-bold mb-1">{item.category}</p>
                  <p className="text-xs mb-1">{item.date}</p>
                  <h4 className="text-sm font-bold text-teal-800">{item.title}</h4>
                  <button
                    onClick={() => updateFeaturedNews(item)}
                    className="mt-2 text-teal-600 font-semibold text-sm hover:text-teal-500"
                  >
                    → Read now
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default News_Con