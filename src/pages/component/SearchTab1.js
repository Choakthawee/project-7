export default function SearchTab1({ searching, setSearching, loading,setSearchInput}) {
    function TabSubject({ index, name, idsubject }) {
        return (
            <button type='button' key={index}
                className='flex p-2 justify-start gap-2'
                value={name} onClick={(e) => { setSearchInput(e.target.value); setSearching(null) }} >
                <a className=" text-gray-400">{idsubject}</a>
                {name}
            </button>
        );
    }
    return (
        <div style={{marginTop:72}} className=' bg-white w-fit md:w-1/2 max-h-44 absolute flex flex-col overflow-y-auto'>
            {searching.length > 0 ? (
                searching.map((v, i) => (
                    <TabSubject key={i} index={i} name={v.name} year={v.years} idsubject={v.idsubject}></TabSubject>
                ))
            ) : (
                loading ? (
                    <input type='button' className='' value={"Loading..."} />
                ) : (
                    <p>{searching.msgerror}</p>
                )
            )}
        </div>
    )
}