using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;

namespace SuperMessenger.Controllers
{
    public class RoleController : Controller
    {
        private RoleManager<ApplicationRole> _roleManager;
        private UserManager<ApplicationUser> _userManager;
        public RoleController(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        //[Authorize(Policy = "ManageUsers")]
        public ViewResult Index() => View(_roleManager.Roles);

        //public async Task<ViewResult> Index()
        //{
        //    var roleasd = await _roleManager.Roles.ToListAsync();
        //    var roles = await _roleManager.FindByNameAsync("Guest");
        //    var res = _roleManager.Roles.ToList();
        //    return View(_roleManager.Roles);
        //}
        private void Errors(IdentityResult result)
        {
            foreach (IdentityError error in result.Errors)
                ModelState.AddModelError("", error.Description);
        }

        //[Authorize(Policy = "ManageAllRoles")]
        public IActionResult Create() => View();

        [HttpPost]
        //[Authorize(Policy = "ManageAllRoles")]
        public async Task<IActionResult> Create([Required] string name)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = await _roleManager.CreateAsync(new ApplicationRole() { Name = name });
                if (result.Succeeded)
                    return RedirectToAction("Index");
                else
                    Errors(result);
            }
            return View(name);
        }
        [HttpPost]
        //[Authorize(Policy = "ManageAllRoles")]
        public async Task<IActionResult> Delete(string id)
        {
            ApplicationRole role = await _roleManager.FindByIdAsync(id);
            if (role != null)
            {
                IdentityResult result = await _roleManager.DeleteAsync(role);
                if (result.Succeeded)
                    return RedirectToAction("Index");
                else
                    Errors(result);
            }
            else
                ModelState.AddModelError("", "No role found");
            return View("Index", _roleManager.Roles);
        }
        //[Authorize(Policy = "ManageUsers")]
        public async Task<IActionResult> Update(string id)
        {
            ApplicationRole role = await _roleManager.FindByIdAsync(id);
            if (CheckPermissionsToUpdate(role.Name))
            {
                List<ApplicationUser> members = new List<ApplicationUser>();
                List<ApplicationUser> nonMembers = new List<ApplicationUser>();
                foreach (ApplicationUser user in _userManager.Users)
                {
                    var list = await _userManager.IsInRoleAsync(user, role.Name) ? members : nonMembers;
                    list.Add(user);
                }
                return View(new RoleEdit
                {
                    Role = role,
                    Members = members,
                    NonMembers = nonMembers
                });
            }
            else
            {
                return View("Index", _roleManager.Roles);
            }
        }

        //[Authorize(Policy = "ManageUsers")]
        public bool CheckPermissionsToUpdate(string roleName)
        {
            if (roleName == "User")
            {
                return true;
            }
            else if (roleName == "Manager")
            {
                if (User.Claims.Where(claim => claim.Type == "Permission" && claim.Value == "ManageManagers").Count() > 0)
                {
                    return true;
                }
                return false;
            }
            else
            {
                if (User.Claims.Where(claim => claim.Type == "Permission" && claim.Value == "ManageAllRoles").Count() > 0)
                {
                    return true;
                }
                return false;
            }
        }
        [HttpPost]
        //[Authorize(Policy = "ManageUsers")]
        public async Task<IActionResult> Update(RoleModification model)
        {
            if (CheckPermissionsToUpdate(model.RoleName))
            {
                IdentityResult result;
                if (ModelState.IsValid)
                {
                    foreach (string userId in model.AddIds ?? new string[] { })
                    {
                        ApplicationUser user = await _userManager.FindByIdAsync(userId);
                        if (user != null)
                        {
                            result = await _userManager.AddToRoleAsync(user, model.RoleName);
                            if (!result.Succeeded)
                                Errors(result);
                        }
                    }
                    foreach (string userId in model.DeleteIds ?? new string[] { })
                    {
                        ApplicationUser user = await _userManager.FindByIdAsync(userId);
                        if (user != null)
                        {
                            result = await _userManager.RemoveFromRoleAsync(user, model.RoleName);
                            if (!result.Succeeded)
                                Errors(result);
                        }
                    }
                }

                if (ModelState.IsValid)
                    return RedirectToAction(nameof(Index));
                else
                    return await Update(model.RoleId);
            }
            else
            {
                return View("Index", _roleManager.Roles);
            }
        }
        //[Authorize(Policy = "ManageAllRoles")]
        public IActionResult CreateClaim() => View();
        [HttpPost]
        [ActionName("CreateClaim")]
        //[Authorize(Policy = "ManageAllRoles")]
        public async Task<IActionResult> CreateClaim(string claimType, string claimValue, string roleName)
        {
            ApplicationRole role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return RedirectToAction("Index"); //404
            }
            Claim claim = new Claim(claimType, claimValue, ClaimValueTypes.String);
            IdentityResult result = await _roleManager.AddClaimAsync(role, claim);

            if (result.Succeeded)
                return RedirectToAction("Index");
            else
                Errors(result);
            return View();
        }
    }
}
