function Donate_Con({ openDonationModal }) {
  return (
    <div id="donate" className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-teal-800 mb-4">Donate Now</h2>
      <div className="border-t border-teal-800 w-16 mx-auto mb-6"></div>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Your generous contributions help us deliver iftar meals to over 1,000 families during Ramadan, empower rural youth with educational resources, and provide healthcare camps for underserved communities, ensuring care and support reach those in need.
          </p>
          <div className="text-center">
            <button onClick={openDonationModal} className="bg-teal-800 text-white py-2 px-6 rounded-lg hover:bg-teal-700">Make a Donation</button>
          </div>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dzqdfaghg/image/upload/v1750036911/496940432_9621165381253308_5638857211374510766_n_eyfmqt.jpg" alt="Donate Now Community Support" className="w-full h-96 object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Donate_Con