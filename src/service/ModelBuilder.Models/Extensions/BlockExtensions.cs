using Mb.Models.Application;
using Mb.Models.Data;
using Newtonsoft.Json;

namespace Mb.Models.Extensions;

public static class BlockExtensions
{
    public static Block CalculatePosition(this Block current, Block rootOrigin, PrepareAm prepare)
    {
        if (current == null)
            return null;

        if (rootOrigin == null)
            return current;

        var originX = (int) prepare.DropPositionX;
        var originY = (int) prepare.DropPositionY;

        if (current.Id == rootOrigin.Id)
        {
            return current;
        }

        var currentPosition = JsonConvert.DeserializeObject<Position>(current.PositionTree);
        var rootOriginPosition = JsonConvert.DeserializeObject<Position>(current.PositionTree);

        var diffX = currentPosition.PosX - rootOriginPosition.PosX;
        var diffY = currentPosition.PosY - rootOriginPosition.PosY;

        currentPosition.PosX = originX + diffX;
        currentPosition.PosY = originY + diffY;

        current.PositionTree = JsonConvert.SerializeObject(currentPosition);

        return current;
    }
}