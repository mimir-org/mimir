﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data.Enums;
using Mb.Models.Exceptions;

namespace Mb.Models.Extensions
{
    public static class StringExtensions
    {
        public static ICollection<string> ConvertToArray(this string value)
        {
            return string.IsNullOrEmpty(value) ?
                new List<string>() :
                value.Split(",", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList();
        }

        public static string ConvertToString(this ICollection<string> values)
        {
            if (values == null || !values.Any())
                return null;

            var returnValue = values.Aggregate(string.Empty, (current, value) => current + $"{value},");
            return returnValue.TrimEnd(',');
        }

        public static string CreateMd5(this string key)
        {
            var sb = new StringBuilder();
            using var md5 = MD5.Create();
            var inputBytes = Encoding.ASCII.GetBytes(key);
            var hashBytes = md5.ComputeHash(inputBytes);

            foreach (var t in hashBytes)
            {
                sb.Append(t.ToString("X2"));
            }
            return sb.ToString();
        }

        public static (string terminalCategoryId, string terminalTypeId) CreateCategoryIdAndTerminalTypeId(this string terminalName, string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName) || string.IsNullOrEmpty(terminalName))
                throw new ModelBuilderNullReferenceException("Category and terminal can't be null");

            var category = new TerminalCategory
            {
                Name = categoryName
            };

            category.Id = category.Key.CreateMd5();
            var createTerminalType = new CreateTerminalType
            {
                Name = terminalName,
                TerminalCategoryId = category.Id
            };

            var terminalTypeId = createTerminalType.Key.CreateMd5();

            return (category.Id, terminalTypeId);
        }

        public static string IncrementMajorVersion(this string version)
        {
            return IncrementVersion(version, true, false, false);
        }

        public static string IncrementMinorVersion(this string version)
        {
            return IncrementVersion(version, false, true, false);
        }

        public static string IncrementCommitVersion(this string version)
        {
            return IncrementVersion(version, false, false, true);
        }

        public static string ResolveDomain(this string id)
        {
            var idSplit = id.Split('_', StringSplitOptions.RemoveEmptyEntries);
            return idSplit.Length != 2 ? string.Empty : idSplit[0];
        }
        
        public static string ResolveProjectIri(this string id)
        {
            var idSplit = id.Split('_', StringSplitOptions.RemoveEmptyEntries);
            return idSplit.Length != 2 ? string.Empty : idSplit[0];
        }

        public static string ResolveEdgeIri(this string id)
        {
            var idSplit = id.Split('_', StringSplitOptions.RemoveEmptyEntries);
            return idSplit.Length != 2 ? string.Empty : idSplit[0];
        }

        public static string ResolveNodeIri(this string id)
        {
            var idSplit = id.Split('_', StringSplitOptions.RemoveEmptyEntries);
            return idSplit.Length != 2 ? string.Empty : idSplit[0];
        }

        #region Private

        private static string IncrementVersion(string version, bool incrementMajor, bool incrementMinor, bool incrementCommit)
        {
            const int incrementStep = 1;

            if (string.IsNullOrWhiteSpace(version))
                return version;

            var versionStringSplit = version.Trim().Split(".");

            if (versionStringSplit.Length is < 2 or > 3)
                return version;

            string newVersion;
            int versionNumber;

            if (incrementMajor)
            {
                versionNumber = Convert.ToInt32(versionStringSplit[0]) + incrementStep;
                newVersion = versionNumber + ".0";
                return versionStringSplit.Length == 2 ? newVersion : newVersion + ".0";
            }

            if (incrementMinor)
            {
                versionNumber = Convert.ToInt32(versionStringSplit[1]) + incrementStep;
                newVersion = versionStringSplit[0] + "." + versionNumber;
                return versionStringSplit.Length == 2 ? newVersion : newVersion + "." + versionStringSplit[2];
            }

            if (!incrementCommit || versionStringSplit.Length != 3) 
                return version;

            versionNumber = Convert.ToInt32(versionStringSplit[2]) + incrementStep;
            newVersion = versionStringSplit[0] + "." + versionStringSplit[1] + "." + versionNumber;
            
            return newVersion;
        }

        #endregion Private

    }
}
