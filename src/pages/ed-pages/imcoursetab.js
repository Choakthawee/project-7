import { useState } from "react";

export default function InlineCheckbox({ id,isOpen,setApi}) {
  const [checkbox1, setCheck] = useState(localStorage.getItem("ch-" + id)?localStorage.getItem("ch-" + id)==="1"?true:false:Boolean(isOpen));
  
  const d = (checkbox1) => {
    let subjects=[]
    console.log(checkbox1, isOpen);
    if (checkbox1 != isOpen) {
      setApi((p) => [...p, { id: id, IsOpen: checkbox1 }]);
    } else {
      setApi((prevSendApi) => prevSendApi.filter((item) => item.id !== id));
    }
    localStorage.setItem("ch-" + id, checkbox1 ? 1 : 0)
    
  };
  return (
    <div className="flex items-center me-4 justify-center">
      <input
        id="inline-checkbox"
        type="checkbox"
        checked={checkbox1}
        onChange={(e) => {
          setCheck(e.target.checked);
          d(e.target.checked);
        }}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-3"
      />
    </div>
  );
}
