using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        // Gets the list of all the activies available in the database using the mediator object that is create in the
        // BaseApiController that this class references
        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        // Gets a specific activity based on the id
        [HttpGet("{id}")] //api/activities/lksjdklfjklsdjf
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        // This creates a new activity and adds it to the list of activites
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            // We are not returning from our handler
            await Mediator.Send(new Create.Command {Activity = activity});
            return Ok();
        }

        // This updates a specific activity with update fields from the user.
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command {Activity = activity});
            return Ok();
        }

        // This is used to delete an activity from the list of activities
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            await Mediator.Send(new Delete.Command {Id = id});
            return Ok();
        }
    }
}