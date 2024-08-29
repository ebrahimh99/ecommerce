import axios from 'axios'
import { useQuery } from 'react-query'



const Categories = () => {

  const { data, isLoading } = useQuery("Categories", getAllCategories)


  async function getAllCategories() {

    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }



  if (isLoading) {
    return <div className="h-screen bg-green-400 flex justify-center items-center">
      <i className='fa-solid fa-spinner fa-spin fa-5x'></i>
    </div>
  }

  return (
    <section className='py-8 mt-10'>
      <div className="w-full md:w-[90%] lg:w-[75%] m-auto">
        <div className="flex flex-wrap justify-start items-center">
          {data?.data.data.map(function (item, idx) {
            return (
              <div key={idx} className="w-full sm:w-1/2 md:w-1/4 p-4">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:shadow-green-500/50 transition-shadow duration-300">
                  <div className="h-48 w-full overflow-hidden rounded-t-lg">
                    <img 
                      className="w-full h-full object-cover" 
                      src={item.image} 
                      alt="Category image" 
                    />
                  </div>
                  <div className="p-5">
                    <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-green-600 dark:text-white">
                      {item.name}
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

  )
}

export default Categories
