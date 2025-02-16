using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        // Gets the id of a specific activity
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            // Find the request
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken)
                ?? throw new Exception("Cannot find activity");
            // Remove the request
            context.Remove(activity);
            // Save the changes in the database
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
