using Microsoft.Extensions.Configuration;

namespace Ideation
{
    public class ConnStrings 
    {
        public readonly string _connectionString = string.Empty;
        public readonly string _PBconnectionString = string.Empty;
        public readonly string _EPPMconnectionString = string.Empty;
        public readonly string _RIDConnString = string.Empty;
        public ConnStrings()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);

            var root = configurationBuilder.Build();
            _connectionString = root.GetSection("ConnectionStrings").GetSection("IdeationConnString").Value;
            _PBconnectionString = root.GetSection("ConnectionStrings").GetSection("PBConnString").Value;
            _EPPMconnectionString = root.GetSection("ConnectionStrings").GetSection("EPPMConnString").Value;
            _RIDConnString = root.GetSection("ConnectionStrings").GetSection("RIDConnString").Value;
        }

        /// <summary>
        /// This connection string is pointing to InnovationIdeation database
        /// </summary>
        public string ConnectionString
        {
            get => _connectionString;
        }

        /// <summary>
        /// This connection string is pointing to ProjectBrief_QA database
        /// </summary>
        public string PBConnectionString
        {
            get => _PBconnectionString;
        }

        /// <summary>
        /// This connection string is pointing to EPPM database
        /// </summary>
        public string EPPMConnectionString
        {
            get => _EPPMconnectionString;
        }

        /// <summary>
        /// This connection string is pointing to Ingredients database
        /// </summary>
        public string RIDConnString
        {
            get => _RIDConnString;
        }
    }
}