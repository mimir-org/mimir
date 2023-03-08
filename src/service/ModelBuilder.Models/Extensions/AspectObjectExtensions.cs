using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Models.Extensions
{
    public static class AspectObjectExtensions
    {
        public static AspectObject CalculatePosition(this AspectObject current, AspectObject rootOrigin, PrepareAm prepare)
        {
            if (current == null)
                return null;

            if (rootOrigin == null)
                return current;

            var originX = (decimal) prepare.DropPositionX;
            var originY = (decimal) prepare.DropPositionY;

            if (current.Id == rootOrigin.Id)
            {
                return current;
            }

            var diffX = current.PositionX - rootOrigin.PositionX;
            var diffY = current.PositionY - rootOrigin.PositionY;

            current.PositionX = originX + diffX;
            current.PositionY = originY + diffY;

            return current;
        }
    }
}