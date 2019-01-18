namespace PortForwarding.Controllers
{
    using Contracts;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class PortController : ControllerBase
    {
        private readonly IIp _ip;

        public PortController(IIp ip)
        {
            _ip = ip;
        }

        [HttpPost]
        public IActionResult Post(string ip, int port)
        {
            return Ok(new { IsOpened = _ip.PortIsOpen(ip, port) });
        }
    }
}