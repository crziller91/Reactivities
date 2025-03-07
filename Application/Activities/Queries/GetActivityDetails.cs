using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        public class Query : IRequest<Result<Activity>>
        {
            // Gets the id of a specific activity
            public required string Id { get; set; }
        }

        // The handler for getting the activity from the list of activities
        public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
        {
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
                // Use the result object for throwing exceptions instead of doing that here
                if (activity == null) return Result<Activity>.Failure("Activity not found", 404);
                return Result<Activity>.Success(activity);
            }
        }

    }
}