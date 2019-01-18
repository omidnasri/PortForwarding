namespace PortForwarding.Contracts
{
    public interface IIp
    {
        bool PortIsOpen(string ip, int port);
        string FindClientIpAddress();
    }
}