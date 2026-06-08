import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-auto w-[50%] bg-blue-200 p-10 rounded-2xl'>
      <div className='grid place-self-center'>
        <img className='h-60 w-50 rounded-2xl'  src="https://images.pexels.com/photos/18598291/pexels-photo-18598291.jpeg" alt="" />
      </div>
      <div>
        <div>
          <h1 className='p-5 font-light text-orange-400'>Lord Ganesha</h1>
        </div>
        <div className='p-5 flex justify-center'>
          <p>Lord Ganesha, reverently addressed as Ganapati Baba, is one of the most widely worshiped deities in Hinduism. Recognizable by his distinct elephant head and human body, he is revered as the Vighnaharta—the remover of obstacles—and the patron of arts, sciences, intellect, and wisdom. As the lord of beginnings, his invocation traditionally precedes any auspicious endeavor, ritual, or business venture to ensure smooth progress and success.
              He is the son of Lord Shiva and Goddess Parvati. His unique anatomy holds deep symbolic meaning: the large head signifies immense wisdom and deep thinking, the large ears underscore the importance of listening intently, and the trunk represents adaptability and high discernment. In his hands, he typically holds a noose (to capture difficulties) and an axe (to sever attachments), while his favorite sweet, the modak, symbolizes the ultimate reward of spiritual pursuit.
              Ganapati Baba’s vehicle is a humble mouse, illustrating humility and the mastery over worldly desires. His worship culminates annually in the vibrant festival of Ganesh Chaturthi, where millions of devotees celebrate his presence with profound devotion, massive processions, and prayers, seeking his blessings for prosperity, clarity of mind, and auspicious new beginnings.</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
