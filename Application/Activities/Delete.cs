using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                // No error handling here. Presuming that we find a request everytime
                var activity = await _context.Activities.FindAsync(request.Id);

                // Just removes the activity from memory. Does not affect the database here
                _context.Remove(activity);

                // Save the changes to the database
                await _context.SaveChangesAsync();
            }
        }
    }
}