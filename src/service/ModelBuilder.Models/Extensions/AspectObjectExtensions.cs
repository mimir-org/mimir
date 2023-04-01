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

        var currentPosition = JsonConvert.DeserializeObject<AspectObjectPositionDm>(current.Position);
        var rootOriginPosition = JsonConvert.DeserializeObject<AspectObjectPositionDm>(current.Position);

        var diffX = currentPosition.ThreePosX - rootOriginPosition.ThreePosX;
        var diffY = currentPosition.ThreePosY - rootOriginPosition.ThreePosY;

        currentPosition.ThreePosX = originX + diffX;
        currentPosition.ThreePosY = originY + diffY;

        current.Position = JsonConvert.SerializeObject(currentPosition);

        return current;
    }
}