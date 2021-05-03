﻿using System.Collections.Generic;
using Mb.Models;

namespace Mb.Core.Repositories
{
    public interface ILibraryRepository
    {
        IEnumerable<LibNode> GetAll(string searchString);
    }
}
