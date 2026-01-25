// AlertModal.tsx
'use client';

interface Props {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export default function AlertModal({ isOpen, message, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      data-testid="alert-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-[360px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="px-8 py-10 text-center">
          <p className="whitespace-pre-wrap break-words text-lg font-semibold text-gray-900">
            {message}
          </p>
        </div>

        <div className="h-px w-full bg-gray-100" />

        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-4 cursor-pointer text-lg font-semibold text-primary-600 font-semibold cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
