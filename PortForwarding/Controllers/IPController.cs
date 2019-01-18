namespace PortForwarding.Controllers
{
    using Contracts;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class IpController : ControllerBase
    {
        private readonly IIp _ip;

        public IpController(IIp ip)
        {
            _ip = ip;
        }

        public IActionResult Get()
        {
            return Ok(new { IpAddress = _ip.FindClientIpAddress() });
        }
    }
}