// ConfirmModal.tsx
'use client';

interface Props {
  isOpen: boolean;
  message: string;
  confirmLabel: string;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export default function ConfirmModal({ isOpen, message, confirmLabel, onConfirm, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      data-testid="confirm-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-[300px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="px-6 py-10">
          <p className="whitespace-pre-wrap break-words text-md font-semibold text-gray-900">
            {message}
          </p>
        </div>

        <div className="px-6 py-3 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="모달 취소"
            className="h-12 flex-1 rounded-md bg-gray-100 text-lg font-semibold text-gray-900 hover:bg-gray-200 active:bg-gray-300 cursor-pointer"
          >
            취소
          </button>

          <button
            type="button"
            onClick={async () => {
              onClose();
              await onConfirm();
            }}
            aria-label="모달 확인"
            className="h-12 flex-1 rounded-md bg-primary-700 text-lg font-semibold text-white hover:bg-purple-900 active:bg-purple-950 cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
