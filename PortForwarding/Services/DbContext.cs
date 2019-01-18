namespace PortForwarding.Services
{
    using Contracts;
    using Microsoft.AspNetCore.Hosting;
    using System.IO;

    public class DbContext : IDbContext
    {
        private readonly IHostingEnvironment _host;

        public DbContext(IHostingEnvironment host)
        {
            _host = host;
        }

        public void SaveOrUpdate(string message)
        {
            if (!Directory.Exists($"{_host.ContentRootPath}\\DB"))
            {
                Directory.CreateDirectory($"{_host.ContentRootPath}\\DB");
            }

            if (!File.Exists($"{_host.ContentRootPath}\\DB\\Suggestions.txt"))
            {
                File.Create($"{_host.ContentRootPath}\\DB\\Suggestions.txt").Close();
            }

            using (var writer = File.AppendText($"{_host.ContentRootPath}\\DB\\Suggestions.txt"))
            {
                writer.WriteLine(message);
            }
        }
    }
}
