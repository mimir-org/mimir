using System.Text;
using Mimirorg.Common.Exceptions;

namespace Mb.Models.Configurations
{
    public class DatabaseConfiguration
    {
        public string DataSource { get; set; }
        public int Port { get; set; }
        public int Timeout { get; set; }
        public int ConnectRetryCount { get; set; }
        public int ConnectRetryInterval { get; set; }
        public string InitialCatalog { get; set; }
        public string DbUser { get; set; }
        public string Password { get; set; }

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.AppendLine("########################## DatabaseConfiguration ############################");
            sb.AppendLine("DataSource:              " + DataSource);
            sb.AppendLine("Port:                    " + Port);
            sb.AppendLine("Timeout:                 " + Timeout);
            sb.AppendLine("ConnectRetryCount:       " + ConnectRetryCount);
            sb.AppendLine("ConnectRetryInterval:    " + ConnectRetryInterval);
            sb.AppendLine("InitialCatalog:          " + InitialCatalog);
            sb.AppendLine("DbUser:                  " + DbUser);
            sb.AppendLine("#############################################################################");

            return sb.ToString();
        }

        public string ConnectionString => CreateConnectionString();

        #region Private methods

        private string CreateConnectionString()
        {
            if (string.IsNullOrWhiteSpace(DataSource) || Port <= 0 || string.IsNullOrWhiteSpace(InitialCatalog) ||
                string.IsNullOrWhiteSpace(DbUser) || string.IsNullOrWhiteSpace(Password))
                throw new MimirorgConfigurationException("DatabaseConfiguration is missing or invalid");

            var timeout = 30;
            var retryCount = 1;
            var retryInterval = 10;

            if (ConnectRetryCount > 0)
                retryCount = ConnectRetryCount;

            if (ConnectRetryInterval is >= 1 and <= 60)
                retryInterval = ConnectRetryInterval;

            if (Timeout > 0)
                timeout = Timeout;

            return $@"Data Source={DataSource},{Port};Initial Catalog={InitialCatalog};Integrated Security=False;User ID={DbUser};Password='{Password}';TrustServerCertificate=True;MultipleActiveResultSets=True;Timeout={timeout};ConnectRetryCount={retryCount};ConnectRetryInterval={retryInterval}";
        }

        #endregion
    }
}