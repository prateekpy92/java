import Swal from "sweetalert2";
export const successAlet=(title)=>Swal.fire({
    position: "center",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500
  });

  export const warningAlert=(text)=>Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text
  });
