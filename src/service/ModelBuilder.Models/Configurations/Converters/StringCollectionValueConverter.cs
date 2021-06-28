﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Mb.Models.Configurations.Converters
{
    public class StringCollectionValueConverter : ValueConverter<ICollection<string>, string>
    {
        public StringCollectionValueConverter() : base(
            v => string.Join(",", v.Select(s => s.Trim())),
            v => v.Split(new[] {','}, StringSplitOptions.RemoveEmptyEntries))
        {

        }
    }

    public class StringCollectionValueComparer : ValueComparer<ICollection<string>>
    {
        public StringCollectionValueComparer() : base((c1, c2) => c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())), c => (ICollection<string>)c.ToHashSet())
        {
        }
    }
}
