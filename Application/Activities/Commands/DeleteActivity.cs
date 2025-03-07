using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>> // The way that we return nothing from a mediator handler is we use the "unit" type. It represents a void type since there is no void type in C#
    {
        // Gets the id of a specific activity
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            // Find the request
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            // Remove the request
            context.Remove(activity);
            // Save changes to the database
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            // If it was not found then there was a problem with saving the activity to the database. Therefore throw an error.
            if (!result) return Result<Unit>.Failure("Failed to delete the activity", 400);
            // Return back to the activities controller
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
