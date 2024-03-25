export default function SearchTab1({
  searching,
  setSearching,
  loading,
  setSearchInput,
}) {
  function TabSubject({ index, name, idsubject, email, id }) {
    return (
      <div
        key={index}
        className="p-2 h-20 md:h-fit cursor-pointer flex justify-start gap-2 group/tab transition-all duration-500 hover:bg-slate-100 hover:shadow-xl bg-white"
        id={index}
        onClick={(e) => {
          if (id) {
            setSearchInput(name);
            localStorage.setItem("user_idfore", id);
            setSearching([])
          } else {
            setSearchInput(name);
          }
        }}
      >
        {email}
        <label  className=" text-gray-400 cursor-pointer  group-hover/tab:text-gray-700  transition-all duration-700 ">{idsubject}</label>
        {name}
      </div>
    );
  }
  return (
    <div
      style={{ marginTop: 72 }}
      className=" rounded-lg bg-white w-fit max-h-60  lg:max-h-44 peer-focus:flex group/search hover:flex hidden absolute  flex-col overflow-y-auto"
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
