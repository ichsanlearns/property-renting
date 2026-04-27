type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  isLoading: boolean;
};

function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  isLoading,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-[320px] shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-4">{description}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-lg border hover:bg-gray-50 hover:text-black active:scale-[0.98] transition ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg bg-red-500 w-30 hover:bg-red-600 text-white active:scale-[0.98] transition cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
