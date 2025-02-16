using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        public class Query : IRequest<Activity>
        {
            // Gets the id of a specific activity
            public required string Id { get; set; }
        }

        // The handler for getting the activity from the list of activities
        public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>
        {
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
                if (activity == null) throw new Exception("Activity not found");
                return activity;
            }
        }

    }
}