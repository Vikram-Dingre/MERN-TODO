import {toast, ToastContainer} from "react-toastify"

function alertMsg(payload){
if (payload?.success) {
     return toast.success(payload.message);
    } else {
     return toast.error(payload)
    }
}

export default alertMsg