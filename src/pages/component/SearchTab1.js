export default function SearchTab1({
  searching,
  setSearching,
  loading,
  setSearchInput,
}) {
  function TabSubject({ index, name, idsubject, email, id }) {
    return (
      <button
        type="button"
        key={index}
        className="p-2 cursor-pointer flex justify-start gap-2 peer bg-white"
        value={name}
        id={index}
        onClick={(e) => {
          if (id) {
            setSearchInput(e.target.value);
            localStorage.setItem("user_idfore", id);
            setSearching([])
          } else {
            setSearchInput(e.target.value);
          }
        }}
      >
        {email}
        <label  className=" text-gray-400">{idsubject}</label>
        {name}
      </button>
    );
  }
  return (
    <div
      style={{ marginTop: 72 }}
      id="peer-focus:flex group/search hover:flex hidden "
      className=" rounded-lg bg-white w-fit max-h-44 peer-focus:flex group/search hover:flex hidden absolute  flex-col overflow-y-auto"
    >
      {searching.length > 0 ? (
        searching.map((v, i) => (
          <TabSubject
            key={i}
            index={i}
            name={v.name}
            year={v.years}
            idsubject={v.idsubject}
            email={v.email}
            id={v.id}
          ></TabSubject>
        ))
      ) : loading ? (
        <input type="button" className=" text-left p-2 " value={"Loading..."} />
      ) : (
        searching.msgerror && <p className=" p-2">{searching.msgerror}</p>
      )}
    </div>
  );
}
