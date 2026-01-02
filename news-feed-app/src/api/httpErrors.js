export const httpError = (status) => {
  switch (status) {
    case 400:
      return new Error(
        "Missing or invalid parameters. The server request is malformed or contains invalid parameters."
      );

    case 401:
      return new Error("Unauthorized. The API key is invalid or missing.");

    case 403:
      return new Error(
        "CORS policy failed or IP/Domain restricted. the client making the API request is trying to access a resource on a different domain or IP address, and the server has not been configured to allow cross-origin resource sharing (CORS) from that domain or IP."
      );

    case 409:
      return new Error("Parameter duplicate. Duplicate parameters detected.");

    case 415:
      return new Error(
        "Unsupported request type. The server is unable to process a request because the request is in a format that is not supported by the server."
      );

    case 422:
      return new Error(
        "Unprocessable request, check query values. The server is unable to process a request due to a semantic error in the request, typically indicating that the request is well-formed, but the server is unable to understand or fulfill it."
      );

    case 429:
      return new Error(
        "Too many requests. You have exceeded the rate limit for your plan and you will need to wait for the rate limit to reset before making further requests."
      );

    case 409:
      return new Error("Server error. Please try again later.");

    default:
      return new Error(`Unexpected error (${status}).`);
  }
};
