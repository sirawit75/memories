import React, { useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';
import { PostQuery } from '../../generated/generated-types';
import Image from 'next/image';



const Carousel: React.FC<PostQuery> = ({ post }) => {
    const [slide, setSlide] = useState(0);
    const len = post?.imageUrl.length as number;
    const nextSlide = () => {
        setSlide(slide === len - 1 ? 0 : slide + 1);
    }
    const prevSlide = () => {
        setSlide(slide === 0 ? len - 1 : slide - 1);
    }
    return (
        <div className=" flex justify-center items-start relative   min-w-[350px] md:min-w-[700px] max-w-xl w-full">
            {post?.imageUrl.length as number > 1&&
                <>
                    <BsArrowLeftSquareFill onClick={prevSlide} className='absolute top-[50%] text-3xl cursor-pointer left-4 rounded-full' />
                    <BsArrowRightSquareFill onClick={nextSlide} className='absolute top-[50%] text-3xl cursor-pointer right-4 rounded-full' />
                </>
            }
            {post?.imageUrl.map((item, index) => (
                <div key={index} className={`${index === slide ? 'opacity-100' : 'opacity-0'}  transition-opacity`}>
                    {index === slide && (
                        <Image src={item} alt='' width={350} height={350} priority />
                    )}
                </div>
            ))}
        </div>
    )
}

export default Carousel