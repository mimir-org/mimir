﻿using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class TerminalColor
    {
        public Terminal Terminal { get; set; }
        public TerminalCategory Category { get; set; }
        public string Color { get; set; }
    }
}