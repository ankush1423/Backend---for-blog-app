class ApiResponse {
    constructor(statusCode, data, message = "Success",value=true){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.value = value
    } 
}

export { ApiResponse }
















