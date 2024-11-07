import { useCallback, useState } from 'react';

export const useSelectRow = (defaultSelected?: (string | number)[]) => {
  const [selected, setSelected] = useState<(string | number)[]>(defaultSelected ?? []);

  const onSelectRow = useCallback(
    (inputValue: string | number) => {
      const newSelected = selected.includes(inputValue) ? selected.filter((value) => value !== inputValue) : [...selected, inputValue];
      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = useCallback((checked: boolean, values: (string | number)[]) => {
    if (checked) {
      setSelected(values);

      return;
    }

    setSelected([]);
  }, []);

  return { selected, onSelectRow, onSelectAllRows, setSelected };
};
