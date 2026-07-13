import Modal from "./Modal";
import Button from "./Button";

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Confirm",
  message = "Are you sure?",
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-gray-700">
        {message}
      </p>
    </Modal>
  );
}