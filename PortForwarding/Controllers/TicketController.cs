namespace PortForwarding.Controllers
{
    using Contracts;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System;

    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly IDbContext _db;

        public TicketController(IDbContext db)
        {
            _db = db;
        }
        
        public IActionResult Post(TicketModel model)
        {
            _db.SaveOrUpdate($"DateTime: {DateTime.Now}, Name: {model.Name}, Email: {model.Email}, Message: {model.Message}");

            return Ok();
        }
    }
}