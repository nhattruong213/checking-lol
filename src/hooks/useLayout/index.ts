'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '@/stores/hooks';
import { layoutAction, TLayoutType } from '@/stores/reducers/layout';

export const useLayout = (props: TLayoutType) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(layoutAction.setLayout(props));
  }, [props.type]);

  return {};
};
