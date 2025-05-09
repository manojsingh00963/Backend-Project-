class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static success(data) {
    return new ApiResponse(200, 'Success', data);
  }

  static error(message) {
    return new ApiResponse(500, message, null);
  }
}