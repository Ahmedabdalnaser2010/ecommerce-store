import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion'
import Lottie from 'lottie-react';
import sendEmail from '../../../public/animation/send me email.json'
import done from '../../../public/animation/done 2.json'

function ContactUS() {

    const [state, handleSubmit] = useForm("mannqlgy");
    if (state.succeeded) {
        return <p className='flex  items-center justify-center gap-7'>Your Email has been sent successfully!<Lottie loop={false} animationData={done} className='scale-[1.2]'></Lottie> </p>;
    }

    return (
        <section className=' max-h-[100vh] '>
            <motion.span id='contact' className='text-blue-400 dark:text-white  flex justify-center font-bold text-3xl p-2 w-[220px] m-auto  italic '  > Contact Us</motion.span>
            <div className=' mt-5   text-slate-600 dark:text-white '>
                <div className="title py-5 flex items-center">
                    <span className='icon-envelope1 text-[30px] mr-4'></span>
                    {/* <span className='text-[30px] font-bold'>Contact Us</span> */}
                    <p>Contact us for more information and get notified when i publish something new.</p>
                </div>

                {/* <p>Contact us for more information and get notified when i publish something new.</p> */}
                <div className='flex justify-center md:justify-between items-center h-[450px]'>
                    <form action='https://formspree.io/f/mpwpypkj' method='post' onSubmit={handleSubmit} className='flex flex-col justify-center items-start gap-5 mt-7'>
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-3'>
                            <label htmlFor="name" className='w-[150px]'>Your Name:</label>
                            <input id='name' name='name' required type="text" className=' rounded-lg focus:shadow-red-2000 focus:border-black w-[280px] bg-white lg:w-[340px] dark:bg-zinc-800 shadow-inner shadow-gray-300 border-none' />
                            <ValidationError
                                prefix="Name"
                                field="name"
                                errors={state.errors}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-3'>
                            <label htmlFor="email" className='w-[150px]'>Email-Address:</label>
                            <input id='email' name='email' required type="email" className=' rounded-lg focus:shadow-red-2000 focus:border-black w-[280px] bg-white lg:w-[340px] dark:bg-zinc-800 shadow-inner shadow-gray-300 border-none' />
                            <ValidationError
                                prefix="Email"
                                field="email"
                                errors={state.errors}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row items-start md:items-start gap-3'>
                            <label htmlFor="message" className='w-[150px]'>Your Message:</label>
                            <textarea name="message" id='message' required className='  w-[280px] h-[150px]  lg:w-[340px] bg-transparent focus:shadow-none rounded-lg bg-white border-none dark:bg-zinc-800 shadow-inner shadow-gray-300' />

                            <ValidationError
                                prefix="Message"
                                field="message"
                                errors={state.errors}
                            />
                        </div>
                        <button aria-label='submit' disabled={state.submitting} className=' px-3 py-2 rounded-lg dark:hover:bg-gray-500  dark:bg-zinc-800 bg-zinc-400 text-white  self-end  w-[100px] shadow-inner shadow-gray-300 dark:shadow-zinc-400'>Submit</button>
                    </form>
                    <div className='hidden lg:flex'>
                        <Lottie animationData={sendEmail} loop={1} className='scale-[0.7]'></Lottie>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ContactUS
