import {logo} from '../assets';
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='w-full flex justify-between items-center mb-10 pt-3'>
        <img src={logo} alt="logo" />
        <button type='button' onClick={()=> window.open('https://github.com/Rnmoon')} className='black_btn'>Github</button>
      </nav>
      <motion.h1
      className="head_text"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      Summarize Articles with <br className="max-md:hidden"/>
      <motion.span
        className="orange_gradient"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        OpenAI GPT-4
      </motion.span>
    </motion.h1>
{/* <h1 className='head_text'>Summarize Articles with <br className='max-md:hidden'/><span className='orange_gradient'>OpenAI GPT-4</span></h1> */}
      <motion.h2
      className="desc"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
     Simplify your reading with Summarize, an open-source article summarizer that transforms lengthy articles into clear and concise summaries
    </motion.h2>
    </header>
  )
}

export default Hero