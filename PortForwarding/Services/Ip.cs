namespace PortForwarding.Services
{
    using Microsoft.AspNetCore.Http;
    using PortForwarding.Contracts;
    using System.Net.Sockets;

    internal class Ip : IIp
    {
        private readonly IHttpContextAccessor _accessor;

        public Ip(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public bool PortIsOpen(string ip, int port)
        {
            if (string.IsNullOrWhiteSpace(ip))
            {
                ip = FindClientIpAddress();
            }

            using (TcpClient tcpClient = new TcpClient())
            {
                try
                {
                    tcpClient.Connect(ip, port);
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }

        public string FindClientIpAddress()
        {
            string remoteIpAddress = null;
            if (_accessor.HttpContext.Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                remoteIpAddress = _accessor.HttpContext.Request.Headers["X-Forwarded-For"];
            }

            if (string.IsNullOrWhiteSpace(remoteIpAddress))
            {
                remoteIpAddress = _accessor.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
            }

            return remoteIpAddress;
        }
    }
}
