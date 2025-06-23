using System;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// This is a controller class that handles user account actions like registering a new user.
// It uses a SignInManager to help manage user sign-in and registration.
public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
    // This tag says anyone can access this method without logging in.
    [AllowAnonymous]
    // This tag says this method responds to a POST request to the "/register" URL.
    [HttpPost("register")]
    // This method lets a new user sign up by sending their details (like email and password).
    // It takes a RegisterDto object that holds the user's registration info.
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        // Creates a new User object with the email and display name from the registration info.
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName
        };

        // Tries to create the new user in the system with their email and password.
        // The SignInManager handles the actual creation process.
        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        // If the user was created successfully, send back an "OK" response.
        if (result.Succeeded) return Ok();

        // If there were problems creating the user, loop through each error.
        foreach (var error in result.Errors)
        {
            // Add each error to the ModelState with a code and description so the user knows what went wrong.
            ModelState.AddModelError(error.Code, error.Description);
        }

        // If there were errors, return a response that lists all the problems.
        return ValidationProblem();
    }

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent();

        var user = await signInManager.UserManager.GetUserAsync(User);

        if (user == null) return Unauthorized();

        return Ok(new
        {
            user.DisplayName,
            user.Email,
            user.Id,
            user.ImageUrl
        });
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();

        return NoContent();
    }
}
