function Search({searchvalue, setsearchvalue}) {
    return (
        <>
            <input
                type="search"
                className='bg-white w-40 rounded px-2 py-1 text-black focus:outline-none'
                placeholder="Search..."
                value={searchvalue}
                onChange={(e) => setsearchvalue(e.target.value)}
            />
        </>
    )
}

export default Search;