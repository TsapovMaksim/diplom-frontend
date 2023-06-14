export type BuildQueryArgs = {
  characteristicId?: number;
  productCategoryId?: number;
  filterId?: number;
};

const bulidQuery = ({
  characteristicId,
  productCategoryId,
  filterId,
}: BuildQueryArgs) => {
  let queryStr = '?';
  if (characteristicId) queryStr += `characteristicId=${characteristicId}`;
  if (productCategoryId) queryStr += `productCategoryId=${productCategoryId}`;
  if (filterId) queryStr += `filterId=${filterId}`;

  return queryStr;
};

export default bulidQuery;
