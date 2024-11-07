const ascendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  if (aValue === null || aValue === undefined) {
    return -1;
  }

  if (bValue === null || bValue === undefined) {
    return 1;
  }

  if (bValue < aValue) {
    return 1;
  }

  if (bValue > aValue) {
    return -1;
  }

  return 0;
};

export const getComparator = <Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
  return order === 'asc' ? (a, b) => ascendingComparator(a, b, orderBy) : (a, b) => -ascendingComparator(a, b, orderBy);
};
