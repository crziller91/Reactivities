using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            // Technically speaking commands do not return anything. This is the difference between
            // a command and a query
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // Adding the activity to memory. We are not touching the database at this point so we don't
                // need to use the async method here.
                _context.Activities.Add(request.Activity);
                
                // This line will saves the changes to the database. It uses await to run asynchronously, meaning
                // it won't block the calling thread while waiting for the database operation to complete
                await _context.SaveChangesAsync();
            }
        }
    }
}