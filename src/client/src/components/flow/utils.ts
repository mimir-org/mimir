export interface GetCenterParams {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
  }
  
  export const getCenter = ({
    sourceX,
    sourceY,
    targetX,
    targetY,
  }: GetCenterParams): [number, number, number, number] => {
    const xOffset = Math.abs(targetX - sourceX) / 2;
    const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
  
    const yOffset = Math.abs(targetY - sourceY) / 2;
    const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
  
    return [centerX, centerY, xOffset, yOffset];
  };
  