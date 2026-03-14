function getErrorMessage(error){
    return error?.response?.data?.message || error.message 
}

export default getErrorMessage;