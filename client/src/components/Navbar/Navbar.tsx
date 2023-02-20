import { withUrqlClient } from 'next-urql';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { SyncLoader } from 'react-spinners';
import { useLogoutMutation, useMeQuery } from '../../generated/generated-types';
import { logoTitle, navUnuser, navUser } from '../../utils/constant/nav';
import { createUrqlClient } from '../../utils/urql/createUrqlClient';


const Navbar = () => {
    const [mobileNav, setMobileNav] = useState(false);
    const [isServer, setIsServer] = useState(true);
    const [{ fetching }, logout] = useLogoutMutation();
    useEffect(() => setIsServer(false), []);
    const [{ data }] = useMeQuery({ pause: isServer });
    const handleLogout = async () => {
        let _: any;
        if (mobileNav)
            setMobileNav(!mobileNav);
        await logout(_);
    }
    return (
        <div className="mx-auto h-20 w-full sticky top-0 z-50 shadow-lg" >
            {/* <div className={`${color}`}>dlksajd</div> */}
            <div className='p-2 flex justify-between md:justify-between items-center  bg-slate-900  '>
                <div data-testid="title" className="flex items-center justify-center ml-2 hover:scale-105 duration-300 cursor-pointer" >
                    <a href="/">
                        <h1 className='text-center   md:ml-3 text-lg md:text-4xl md:mr-2 font-extrabold text-zinc-200'>
                            {logoTitle}
                        </h1>
                    </a>
                    <div className='w-16 h-auto '>
                        <a href="/">
                            <Image src='/memories.png' priority={true} alt='icon' className='w-full' width={60} height={60} />
                        </a>
                    </div>
                </div>
                <div className='hidden md:flex text-zinc-200 items-center justify-around'>
                    <ul  className='flex justify-center items-center'>
                        {!data?.me ? (
                            navUnuser.map((item, index) => (
                                <li key={index}  data-testid="menu-list">
                                    <a href={item.ref} className='active:text-orange-500 p-3 md:mr-3 font-semibold hover:text-orange-500 hover:scale-105 duration-300'>{item.text}</a>
                                </li>
                            ))
                        ) :
                            navUser.map((item, index) => (
                                item.text === "Log out" ?
                                    <li data-testid="menu-list"
                                        className='cursor-pointer active:text-orange-500 p-3 md:mr-3 font-semibold hover:text-orange-500 hover:scale-105 duration-300'
                                        onClick={handleLogout}
                                        key={index}
                                    >
                                        {item.text}
                                    </li> :
                                    <li key={index} data-testid="menu-list">
                                        <a href={item.ref} className='active:text-orange-500 p-3 md:mr-3 font-semibold hover:text-orange-500 hover:scale-105 duration-300'>{item.text}</a>
                                    </li>
                            ))
                        }
                    </ul>
                    <div>
                        {data?.me ?
                            (
                                // <Link href='/profile/[id]' as={`/profile/${data.me.id}`}
                                // className='active:text-orange-500 md:flex bg-green-400 w-auto ml-6 mr-3 px-4 py-2 rounded-3xl h-auto text-center hidden'>
                                <span data-testid="profile" className={`font-bold  md:flex bg-emerald-400 w-auto ml-6 mr-3 px-4 py-2 rounded-3xl h-auto text-center hidden`}>{data.me.username[0].toLocaleUpperCase()}</span>
                                // </Link>
                            ) : null
                        }
                    </div>
                </div>
                <div className='text-zinc-200  md:hidden cursor-pointer ' >
                    <div className='flex justify-center items-center gap-2 mr-2'>
                        {data?.me ?
                            (
                                // <Link href='/profile/[id]' as={`/profile/${data.me.id}`}
                                // className='bg-green-400 w-auto px-4 py-2 rounded-3xl h-auto text-center active:text-orange-500'>
                                <span className={`font-bold text-center bg-emerald-400 w-auto px-4 py-2 rounded-3xl h-auto `}>{data.me.username[0].toLocaleUpperCase()}</span>
                                // </Link>
                            ) : null
                        }
                        <span className=' active:text-orange-500 ' onClick={() => setMobileNav(!mobileNav)}>
                            {mobileNav ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </span>
                    </div>
                </div>
                {mobileNav && (
                    <ul className='flex flex-col items-center absolute top-0 left-0 justify-center h-screen w-2/3 text-zinc-200 bg-slate-600 -z-10 '>
                        {!data?.me ? (
                            navUnuser.map((item, index) => (
                                <li key={index} onClick={() => setMobileNav(!mobileNav)} className='active:text-orange-500 p-3 font-semibold'>
                                    <a href={item.ref}>{item.text}</a>
                                </li>
                            ))
                        ) : (
                            navUser.map((item, index) => (
                                item.text === "Log out" ?
                                    <li
                                        key={index}
                                        className='cursor-pointer active:text-orange-500 p-3 font-semibold'
                                        onClick={handleLogout}
                                    >
                                        {item.text}
                                    </li> :
                                    <li key={index} onClick={() => setMobileNav(!mobileNav)} className='active:text-orange-500 p-3 font-semibold'>
                                        <a href={item.ref}>{item.text}</a>
                                    </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
            <div className={`${!fetching ? 'hidden' : ''} flex justify-center items-center h-2/4 w-2/4 bg-slate-200  mx-auto z-20 mt-8 rounded-full md:w-1/6 md:h-3/4`}>
                <SyncLoader color="#36d7b7" size={12} loading={fetching} />
            </div>
        </div>
    )
}



export default withUrqlClient(createUrqlClient)(Navbar);