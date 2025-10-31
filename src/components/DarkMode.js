import { FaMoon } from "react-icons/fa";
import { BiSolidToggleLeft, BiToggleRight } from "react-icons/bi";
import { IoSunny } from "react-icons/io5";

function DarkMode({nightMode, setnightMode}) {
    return (
        <div className='flex items-center justify-center'>
            <FaMoon className='text-black dark:text-white' />
            <button
                onClick={() => setnightMode(!nightMode)}
            >
                {nightMode ? <BiSolidToggleLeft size={30} className='text-zinc-400 mx-1' /> : <BiToggleRight size={30} className='text-yellow-400 mx-1' />}
            </button>
            <IoSunny className='text-black dark:text-white' />
        </div>
    )
}

export default DarkMode;