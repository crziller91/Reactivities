using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        // Creating a private variable for mediator 
        private IMediator _mediator;

        // And we are going to populate the private variable with the mediator service. If another controller comes along and
        // decides it also needs mediator, then if it got it in this property great, if not its going to go and get it again.
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}