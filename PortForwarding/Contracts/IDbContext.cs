namespace PortForwarding.Contracts
{
    public interface IDbContext
    {
        void SaveOrUpdate(string message);
    }
}
