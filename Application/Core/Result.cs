namespace Application.Core;

/* We are going to utlize this result object inside each of our handlers and depedning on
the logic we're either going to return a result of success or a result of failure. */
public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public string? Error { get; set; }
    public int Code { get; set; }

    // If the handler was successful, then we call this method
    public static Result<T> Success(T value) => new() {IsSuccess = true, Value = value};
    // If the handler is a failure and not successful, then we call this method
    public static Result<T> Failure(string error, int code) => new()
    {
        IsSuccess = false,
        Error = error,
        Code = code
    };
}
