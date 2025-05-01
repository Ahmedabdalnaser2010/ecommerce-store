import React from 'react'
import { Carousel } from 'flowbite-react'

const CarsoulforOffers = () => {
    return (
        <div className="h-56 m-auto w-full mb-[40px] md:w-[65%] sm:h-80 xl:h-[400px]">
            <Carousel className=''>
                <img className='h-[100%] rounded-2xl object-cover' src="https://img.freepik.com/free-photo/big-sale-discounts-products_23-2150336669.jpg" alt="black-friday-super-sale" />
                <img className='h-[100%] rounded-2xl object-cover' src="https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_120329-2158.jpg" alt="black-friday-super-sale" />
                <img className='h-[100%] rounded-2xl object-cover' src="https://img.freepik.com/premium-psd/gaming-laptop-sale-promotion-banner_252779-743.jpg" alt="black-friday-super-sale" />
                <img className='h-[100%] rounded-2xl object-cover' src="https://img.freepik.com/premium-psd/smart-phone-sale-promotion-black-friday-sale-web-banner-template_179771-192.jpg" alt="black-friday-super-sale" />
            </Carousel>
        </div>
    )
}

export default CarsoulforOffers
