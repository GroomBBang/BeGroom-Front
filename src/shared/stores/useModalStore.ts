import { create } from 'zustand';
interface ModalStore {
  type: 'alert' | 'confirm' | null;
  isOpen: boolean;
  message: string;
  confirmLabel: string;
  onConfirm: () => void | Promise<void>;

  onAlertModal: (message: string, onConfirm?: () => void | Promise<void>) => void;
  onConfirmModal: (
    message: string,
    confirmLabel: string,
    onConfirm: () => void | Promise<void>,
  ) => void;
  clearModal: () => void;
}
export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  message: '',
  confirmLabel: '',
  onConfirm: () => {},

  onAlertModal: (message: string, onConfirm?: () => void | Promise<void>) =>
    set({ type: 'alert', isOpen: true, message, onConfirm: onConfirm || (() => {}) }),
  onConfirmModal: (message: string, confirmLabel: string, onConfirm: () => void | Promise<void>) =>
    set({ type: 'confirm', isOpen: true, message, confirmLabel, onConfirm }),
  clearModal: () =>
    set({ type: null, isOpen: false, message: '', confirmLabel: '', onConfirm: () => {} }),
}));
