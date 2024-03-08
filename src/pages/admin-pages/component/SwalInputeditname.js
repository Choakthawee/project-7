import Swal from "sweetalert2";

export default async function openInputAlert (title="",lable="",data="") {
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
      Swal.fire(`You entered: ${inputValue}`);
    }
  };
