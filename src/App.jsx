import './App.css'
import { useState } from 'react'
import Cards from './components/Cards'
import { cities } from './json/cities.json'

function App() {
  const [ city, setCity ] = useState('Sevilla')
  const [ started, setStarted ] = useState(false)
  const [ listOfActivities, setListOfActivities] = useState([])

  const handleChangeCity = (evt) => {
    setCity(evt.target.value)
  }

  const handleShowCity = () => {
    setStarted(!started)
  }

  return (
    <section className="bg-custom1-100 h-screen">
      <div>
        <a href='/'>
          <img 
            loading='lazy'
            src='/public/radixLogo.png'
            className={`${started ? 'w-44 pt-4 pb-5' : 'w-72 pt-32 lg:pt-36'} mx-auto mb-5 lg:w-96 lg:pt-20 ${started ? 'lg:flex lg:justify-start lg:ml-32' : ''}`}
          />
        </a>

        <section className={`flex flex-col gap-10 mt-5 justify-center ${started ? 'lg:flex lg:justify-start lg:ml-52 lg:mt-10': 'items-center'}`}>
          <div className={`lg:flex-col text-[18px] ${started ? 'text-left -ml-14 hidden lg:block lg:max-w-96' : 'px-2 lg:px-0 max-w-96 lg:max-w-[50rem]'}`}>
            <p>Una iniciativa para que explores el mundo rural desde un punto de vista más personal.</p>
            <p className='font-bold'>Conoce, viaja y disfruta.</p>
          </div>
          
          <div className={`${started ? 'flex flex-col' : 'hidden'}`}>
            <div className={`text-[18px] flex-col justify-center max-w-[50rem] ${started ? 'text-left lg:-ml-14 hidden lg:block' : 'px-2 lg:px-0 text-pretty'}`}>
              <p>Selecciona donde te gustaría pasar tu próxima aventura:</p>
            </div>

            <select onChange={handleChangeCity} className={`${started ? 'lg:-ml-14 mx-auto lg:mt-4' : 'mx-auto'} w-44 rounded-sm -mt-5 select-center`}>
                {cities.map(city => (
                    <option key={city.id}>{city.name}</option>    
                ))}
            </select>
          </div>

          {
            listOfActivities.length > 0 ? (
              <div className='bg-custom1-300 hidden lg:-ml-14 lg:flex gap-5 p-5 w-[10rem] overflow-x-auto'>
                {listOfActivities.map(activity => (
                  <img key={activity.name} className='w-8 h-8' loading='lazy' alt={activity.name} src={activity.images[0]} />
                ))}
              </div>
            ) : ''
          }
        </section> 

        <section className={`${started ? 'lg:flex lg:justify-center lg:ml-80 lg:-mt-96 pt-20' : ''}`}>
          {
            started
              ? <Cards cityName={city} listOfActivities={listOfActivities} setListOfActivities={setListOfActivities} />
              : <div> 
                  <button className={`mt-10 lg:mt-8  lg:hover:scale-110 transition ease-in-out duration-300`} onClick={handleShowCity}>
                    <img src='/public/descubrenos.png' className='w-72 h-22' loading='lazy' alt='right arrow' />  
                  </button>

                  <p className='text-[18px]'>¡Estás a un solo click de tu próxima aventura!</p>
                </div> 
          }
        </section>
      </div>
    </section>
  )
}

export default App
