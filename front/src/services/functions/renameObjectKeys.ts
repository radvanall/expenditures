const renameObjectKeys = <T>(
  data: { [x: string]: T[keyof T] }[],
  typeObject: object
): T[] => {
  const itemArray: T[] = data.map((item: { [x: string]: T[keyof T] }) => {
    const newItem: T = {} as T;
    Object.keys(typeObject).forEach((key) => {
      newItem[key as keyof T] =
        item[typeObject[key as keyof typeof typeObject] as keyof typeof item];
    });
    return newItem;
  });
  return itemArray;
};
export default renameObjectKeys;
