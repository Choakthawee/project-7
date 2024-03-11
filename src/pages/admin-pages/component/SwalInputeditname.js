import axios from "axios";
import Swal from "sweetalert2";
import { apiurl } from "../../../config";

export default async function openInputAlert(title = "", lable = "", data = "", id, table, url) {
  const email = await localStorage.getItem("email")
  const getapi = async (input) => {
    try {
      const dataresponse = await axios.post(apiurl + url, { table: table, newname: input, id: id,email:email });
      const data = dataresponse.data;
      Swal.fire({icon:"success",text:data.msg,showCancelButton:true,confirmButtonText:"หมุนเว็บ",preConfirm:()=>window.location.reload()});
    } catch (error) {
      Swal.fire(error.response.data.msgerror);
    }
  };
  const { value: inputValue } = await Swal.fire({
    title: title,
    input: 'text',
    inputLabel: lable,
    inputPlaceholder: data,
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: (input) => {
      // ตรวจสอบว่าค่า input ไม่ว่างเปล่าหรือไม่
      if (!input) {
        Swal.showValidationMessage('Please enter something');
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  });

  // ตรวจสอบค่า input หลังจาก dialog ถูกปิด
  if (inputValue) {
    getapi(inputValue);
  }
};
