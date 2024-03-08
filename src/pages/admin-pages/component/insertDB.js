import Swal from "sweetalert2";

export default async function insertBox(title,url){
    
    const { value:{ input1: id, input2: name }} = await Swal.fire({
        title: 'Enter your details',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="id">' +
          `<input id="swal-input2" class="swal2-input" placeholder="${title}">`,
        focusConfirm: false,
        preConfirm: () => {
          // Retrieve values from inputs
          const input1 = Swal.getPopup().querySelector('#swal-input1').value;
          const input2 = Swal.getPopup().querySelector('#swal-input2').value;
          // Return an object with the input values
          return { input1: input1, input2: input2 };
        }
      })
    

    if (id) {
        console.log(id,name)
    }
}