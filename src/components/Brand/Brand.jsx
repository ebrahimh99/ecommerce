import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'


const Brand = () => {
  const { data, isLoading } = useQuery("Brand", getAllBrands);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getAllBrands() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  if (isLoading) {
    return <div className="h-screen bg-green-400 flex justify-center items-center">
      <i className='fa-solid fa-spinner fa-spin fa-5x'></i>
    </div>
  }

  const handleCardClick = (brand) => {
    setSelectedBrand(brand);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className='py-8 mt-10'>
      <div className="w-full md:w-[90%] lg:w-[75%] m-auto">
        <div className="flex flex-wrap justify-start items-center">
          {data?.data.data.map((item, idx) => (
            <div key={idx} className="w-full sm:w-1/2 md:w-1/4 p-4">
              <div
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:shadow-green-500/50 transition-shadow duration-300"
                onClick={() => handleCardClick(item)}
              >
                <div className="h-48 w-full overflow-hidden rounded-t-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={item.image}
                    alt="Brand image"
                  />
                </div>
                <div className="p-5">
                  <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-green-600 dark:text-white">
                    {item.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div id="default-modal" className="fixed inset-0 flex justify-center items-start bg-[rgba(0,0,0,0.5)] z-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-end p-4 border-b rounded-t dark:border-gray-600">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 space-y-4 flex items-center justify-between">
                <div>
                  <p className="ps-5 text-3xl leading-relaxed text-green-700 dark:text-gray-400">
                    {selectedBrand.name || "No description available."}
                  </p>
                </div>
                <div>
                  <img src={selectedBrand.image} className='w-full' alt="" />
                </div>

              </div>

              <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={closeModal}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Brand;


