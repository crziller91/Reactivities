using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        // Pass the query in here. This gets passed into the Handler in the Handle method via "request"
        public class Query : IRequest<List<Activity>> {}

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            // Returning a task so we need to make it an async method
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Return the list of activities from the passed in query
                return await _context.Activities.ToListAsync();
            }
        }
    }
}