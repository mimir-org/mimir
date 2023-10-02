using System.Collections.Generic;
using System.Threading.Tasks;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Contracts;

public interface ILibraryRepository
{
    Task<List<QuantityDatumLibCm>> GetQuantityDatums();
    Task<List<UnitLibCm>> GetUnits();
    Task<List<BlockLibCm>> GetBlockTypes();
    Task<List<TerminalLibCm>> GetTerminalTypes();
    Task<List<AttributeLibCm>> GetAttributeTypes();

}