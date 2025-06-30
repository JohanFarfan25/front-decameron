import Swal from 'sweetalert2';


export const showNotification= (icon = 'success',message, title = 'Are you sure?', redirectUrl = false) => {
    return Swal.fire({
        title,
        text: message,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }
        return result.isConfirmed;
    });
};

export const showError = (message, title = 'Error') => {
    Swal.fire({
        icon: 'error',
        title,
        text: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};
