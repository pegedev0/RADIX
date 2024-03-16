import PropTypes from 'prop-types';
import { cities } from '../json/cities.json'
import { useState, useRef } from 'react';
import HeartAddIcon from '../icons/HeartAddIcon';
import HeartRemoveIcon from '../icons/HeartRemoveIcon';

export default function Cards ({ cityName, listOfActivities, setListOfActivities }) {
    const [ cont, setCont ] = useState(0)
    const [ isSwinging, setIsSwinging ] = useState(false)
    const [ isReversedSwinging, setIsReversedSwinging ] = useState(false)
 
    const buttonRef = useRef(null)

    const cityData = cities.find(city => city.name === cityName)

    if (cont >= cityData.activities.length) {
        setCont(0)
    } 

    if (cont < 0) {
        setCont(cityData.activities.length - 1)
    }

    const handleShowCity = () => {
        setCont(prevCont => prevCont + 1)

        setIsSwinging(true)

        setTimeout(() => {
            setIsSwinging(false)
        }, 500)
    } 

    const handleShowPrevCity = () => {
        setCont(prevCont => prevCont - 1)
        setIsReversedSwinging(true)

        setTimeout(() => {
            setIsReversedSwinging(false)
        }, 500)
    }

    const price = {
        free: <span className="mx-2 bg-green-100 text-green-800 text-xs font-medium me-2 mt-1 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Gratis</span>,
        notFree: <span className="mx-2 bg-red-100 text-red-800 text-xs font-medium me-2 mt-1 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">De pago</span>
    }

    if (!cityData || !cityData.activities[cont]) {
        return null
    }

    const handleRemoveActivity = (activity) => {
        const activityIdToRemove = activity.id;
        setListOfActivities(prevList => prevList.filter(prevActivity => prevActivity.id !== activityIdToRemove));
    }
    
    const handleAddActivity = (activity) => {
        const activityIdToAdd = activity.id;
        if (!listOfActivities.some(prevActivity => prevActivity.id === activityIdToAdd)) {
            setListOfActivities(prevList => [...prevList, activity]);
        } 
    }

    return (
        <section className={`font-sans flex-col lg:flex lg:flex-row justify-center items-center rounded-lg ${listOfActivities.length > 0 ? 'lg:-mt-60' : 'lg:-mt-32'} ${listOfActivities.length > 2 ? 'lg:-mt-64' : ''} lg:ml-64 -mt-16`}>
            <button className='lg:mr-10 lg:hover:scale-110 transition ease-in-out duration-300 mb-4 lg:mb-0 hidden lg:block' ref={buttonRef} onClick={handleShowPrevCity}>
                <img src='/public/leftArrow.png' className='size-14' loading='lazy' alt='right arrow' /> 
            </button> 

            <div key={cityData.activities[cont].id} className={`mx-auto justify-center align-center h-[25rem] lg:h-[32rem] mt-3 w-80 lg:w-[35rem] bg-white border border-gray-200 rounded-lg shadow ${isSwinging ? 'swingAnimation' : ''} ${isReversedSwinging ? 'reverseSwingAnimation' : ''}`}>
                <img 
                    src={cityData.activities[cont]?.images[0]} 
                    alt={`Image of ${cityData.activities[cont].name}`} 
                    loading='lazy'
                    className='w-80 h-40 rounded-lg rounded-b-none lg:size-80 lg:w-[35rem]'
                />
                <div className='flex flex-col justify-between h-auto'>
                    <div className='p-2'>
                        <h3 className='font-bold text-2xl'>{cityData.activities[cont].name}</h3>
                    </div>

                    <div className='flex justify-center'>
                        <span className='mx-2 font-semibold text-stone-700'>{cityData.activities[cont].village}</span>
                        •
                        {cityData.activities[cont].free ? price.free : price.notFree}
                    </div>

                    <p className='text-pretty mt-3 mb-3 px-4 text-stone-700'>{cityData.activities[cont].description.split(" ").slice(0,10).join(" ")}...</p>
                
                    <div className='flex flex-row justify-center items-center gap-5'>
                        <a href='#' className='underline text-blue-600'>Ver más</a>
                        
                        <div>
                            {
                                listOfActivities.includes(cityData.activities[cont]) 
                                    ? <button className='bg-red-200 p-1 rounded-full' onClick={() => handleRemoveActivity(cityData.activities[cont])}><HeartRemoveIcon /></button> 
                                    : <button className='bg-green-200 p-1 rounded-full' onClick={() => handleAddActivity(cityData.activities[cont])}><HeartAddIcon /></button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <button className='lg:mr-10 lg:hover:scale-110 transition ease-in-out duration-300 mb-4 lg:mb-0 lg:hidden mr-16 mt-5' ref={buttonRef} onClick={handleShowPrevCity}>
                <img src='/public/leftArrow.png' className='size-14' loading='lazy' alt='right arrow' />  
            </button> 

            <button  className='lg:ml-10 lg:mr-20 lg:hover:scale-110 transition ease-in-out duration-300' ref={buttonRef} onClick={handleShowCity}>
                <img src='/public/rightArrow.png' className='size-14' loading='lazy' alt='right arrow' /> 
            </button> 

            {
            listOfActivities.length > 0 ? (
              <div className='bg-custom1-300 lg:hidden lg:-ml-14 flex gap-5 p-5 w-[10rem] overflow-x-auto mx-auto mb-20'>
                {listOfActivities.map(activity => (
                  <img key={activity.name} className='w-8 h-8' loading='lazy' alt={activity.name} src={activity.images[0]} />
                ))}
              </div>
            ) : ''
          }
        </section>
    
    )
}

Cards.propTypes = {
    cityName: PropTypes.string.isRequired,
    listOfActivities: PropTypes.array.isRequired,
    setListOfActivities: PropTypes.func.isRequired
};