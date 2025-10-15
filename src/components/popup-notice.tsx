'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';

type Notice = {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
};

export function PopupNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const [shownNoticeId, setShownNoticeId] = useState<string | null>(null);

  const firestore = useFirestore();
  const noticeQuery = useMemoFirebase(() => 
    firestore 
      ? query(collection(firestore, 'popup_notices'), where('isActive', '==', true), limit(1))
      : null,
    [firestore]
  );
  const { data: notices } = useCollection<Notice>(noticeQuery);

  const notice = notices?.[0];

  useEffect(() => {
    if (notice && notice.id !== shownNoticeId) {
      setIsOpen(true);
      setShownNoticeId(notice.id);
    }
  }, [notice, shownNoticeId]);

  if (!notice || !isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{notice.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {notice.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setIsOpen(false)}>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
