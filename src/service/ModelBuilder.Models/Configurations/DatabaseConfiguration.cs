using Mb.Models.Exceptions;

namespace Mb.Models.Configurations
{
    public class DatabaseConfiguration
    {
        public string DataSource { get; set; }
        public int Port { get; set; }
        public string InitialCatalog { get; set; }
        public string DbUser { get; set; }
        public string Password { get; set; }

        public string ConnectionString => CreateConnectionString();

        #region Private methods

        private string CreateConnectionString()
        {
            if (string.IsNullOrWhiteSpace(DataSource) || Port <= 0 || string.IsNullOrWhiteSpace(InitialCatalog) ||
                string.IsNullOrWhiteSpace(DbUser) || string.IsNullOrWhiteSpace(Password))
                throw new ModelBuilderConfigurationException("DatabaseConfiguration is missing or invalid");

            return $@"Data Source={DataSource},{Port};Initial Catalog={InitialCatalog};Integrated Security=False;User ID={DbUser};Password='{Password}';TrustServerCertificate=True;MultipleActiveResultSets=True";
        }

        #endregion
    }
}