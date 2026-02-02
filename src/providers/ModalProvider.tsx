'use client';

import AlertModal from '@/shared/components/common/AlertModal';
import ConfirmModal from '@/shared/components/common/ConfirmModal';
import { useModalStore } from '@/shared/stores/useModalStore';

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const modalStore = useModalStore();
  console.log(modalStore.message);
  return (
    <>
      {children}
      {modalStore.isOpen && modalStore.type === 'alert' && (
        <AlertModal
          message={modalStore.message}
          onConfirm={modalStore.onConfirm}
          onClose={modalStore.clearModal}
        />
      )}
      {modalStore.isOpen && modalStore.type === 'confirm' && (
        <ConfirmModal
          message={modalStore.message}
          confirmLabel={modalStore.confirmLabel!}
          onConfirm={modalStore.onConfirm!}
          onClose={modalStore.clearModal}
        />
      )}
    </>
  );
}
