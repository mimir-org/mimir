namespace ModelBuilder.Rdf.Extensions;

public static class UriExtensions
{
    /// <summary>
    /// Get domain type name from uri
    /// </summary>
    /// <param name="uri">Uri</param>
    /// <returns>The domain type name</returns>
    /// <exception cref="ArgumentException">If invalid number of segments</exception>
    public static string GetDomainTypeName(this Uri uri)
    {
        var split = uri.Host.Split('.', StringSplitOptions.RemoveEmptyEntries);
        if (split.Length < 2)
            throw new ArgumentException("Uri does not contain correct segments");

        return $"{split[^2].Trim()}.{split[^1].Trim()}";
    }
}