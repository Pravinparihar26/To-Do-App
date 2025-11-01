import { useState } from "react";
import { MdOutlineManageSearch } from "react-icons/md";

function Search({ searchvalue, setsearchvalue }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={`relative flex items-center rounded ${open && 'bg-white'}`}>
                <input
                    type="search"
                    className='bg-white w-40 rounded px-2 py-1 text-black focus:outline-none hidden lg:block'
                    placeholder="Search..."
                    value={searchvalue}
                    onChange={(e) => setsearchvalue(e.target.value)}
                />
                {
                    open && (
                        <input
                            type="text"
                            className='bg-white w-40 rounded px-2 py-1 text-black focus:outline-none flex lg:hidden'
                            placeholder="Search..."
                            value={searchvalue}
                            onChange={(e) => setsearchvalue(e.target.value)}
                        />
                    )
                }
                <button onClick={() => setOpen((prev) => !prev)} className="right-1 text-black flex lg:hidden">
                    <MdOutlineManageSearch size={24} className="" />
                </button>
            </div>
        </>
    )
}

export default Search;