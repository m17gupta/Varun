'use client';

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';
import { useAppDispatch } from '@/lib/store/hooks';
import { fetchCommentsThunk } from '@/lib/store/comments/commentThunk';

const GetAllCommments = () => {
  const { isFetchedComments } = useSelector((state: RootState) => state.comments);
  const dispatch = useAppDispatch();
  const isApi = useRef<boolean>(false);

  useEffect(() => {
    if (!isFetchedComments && !isApi.current) {
      isApi.current = true;
      dispatch(fetchCommentsThunk()).unwrap();
    } else {
      isApi.current = false;
    }
  }, [isFetchedComments, dispatch]);

  return null;
};

export default GetAllCommments;
