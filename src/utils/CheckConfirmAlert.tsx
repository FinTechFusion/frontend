// "use client"
// import { useTranslations } from 'next-intl';
// import Swal from 'sweetalert2';

// export async function CheckConfirmAlert(onConfirm: () => void, onCancel?: () => void) {
//    const alertT = useTranslations('alerts');

//    const result = await Swal.fire({
//       icon: "error",
//       title: alertT('oopsTitle'),
//       text: alertT('connectAccountText'),
//       showCancelButton: true,
//       confirmButtonColor: "#0D9488",
//       cancelButtonColor: "#d33",
//       confirmButtonText: alertT('connectButtonText'),
//       cancelButtonText: alertT('cancelButtonText'),
//       customClass: {
//          confirmButton: 'custom-ok-btn',
//          cancelButton: 'custom-cancel-btn',
//       },
//    });
//    if (result.isConfirmed) {
//       onConfirm();
//    } else if (result.isDismissed && onCancel) {
//       onCancel();
//    }
// }
