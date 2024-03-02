export default function SearchTab({ searching, setSearching, loading, handleInputChange }) {
    function TabSubject({ index, name, idsubject }) {
        return (
            <button type='button' key={index}
                className='flex p-2 justify-start gap-2'
                value={name} onClick={(e) => { handleInputChange(e); setSearching(null) }} >
                <a className=" text-gray-400">{idsubject}</a>
                {name}
            </button>
        );
    }
    function TabName({ index, name}) {
        return (
            <button type='button' key={index}
                className='flex p-2 justify-start gap-2'
                value={name} onClick={(e) => { handleInputChange(e); setSearching(null) }} >
                {name}
            </button>
        )
    }
    return (
        <div className='mt-16 bg-white w-1/2 max-h-44 absolute flex flex-col overflow-y-auto'>
            {searching.length > 0 ? (
                searching.map((v, i) => (
                    v.name ?
                        <TabSubject key={i} index={i} name={v.name} year={v.years} idsubject={v.idsubject}></TabSubject>
                        :  <TabSubject key={i} index={i} name={v.username} ></TabSubject>
                ))
            ) : (
                loading ? (
                    <input type='button' className='' value={"Loading..."} />
                ) : (
                    <p>{searching.error}</p>
                )
            )}
        </div>
    )
}