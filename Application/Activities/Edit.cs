using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // Getting the activity from entity framework
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                // Auto mapper is going to take all the properties inside "request.Activity" and update the properties inside "activity"
                _mapper.Map(request.Activity, activity);

                // Database gets updated
                await _context.SaveChangesAsync();
            }
        }
    }
}