using Mb.Models.Application;
using Mb.Models.Data;
using Newtonsoft.Json;

namespace Mb.Models.Extensions;

public static class AspectObjectExtensions
{
    public static AspectObjectDm CalculatePosition(this AspectObjectDm current, AspectObjectDm rootOrigin, PrepareAm prepare)
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

        var currentPosition = JsonConvert.DeserializeObject<PositionDm>(current.PositionTree);
        var rootOriginPosition = JsonConvert.DeserializeObject<PositionDm>(current.PositionTree);

        var diffX = currentPosition.PosX - rootOriginPosition.PosX;
        var diffY = currentPosition.PosY - rootOriginPosition.PosY;

        currentPosition.PosX = originX + diffX;
        currentPosition.PosY = originY + diffY;

        current.PositionTree = JsonConvert.SerializeObject(currentPosition);

        return current;
    }
}