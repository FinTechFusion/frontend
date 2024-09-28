import Swal from 'sweetalert2';

export const CheckConfirmAlert = (onConfirm: () => void, onCancel?: () => void) => {
   Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "connect account with binance to continue",
      showCancelButton: true,  
      confirmButtonColor: "#0D9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Connect",
      cancelButtonText: "Cancel",
      customClass: {
         confirmButton: 'custom-ok-btn',  
         cancelButton: 'custom-can  cel-btn',
      },
   }).then((result) => {
      if (result.isConfirmed) {
         onConfirm(); 
      } else if (result.isDismissed && onCancel) {
         onCancel(); 
      }
   });
};
