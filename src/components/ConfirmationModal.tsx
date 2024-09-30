import { Dispatch, SetStateAction, FC, useState } from "react";
import Modal from "@mui/material/Modal";

interface ConfirmationModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => Promise<void>;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  setOpen,
  handleSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true); // Set loading to true when submission starts
    try {
      await handleSubmit(); // Call the form submission function
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false); // Reset loading to false after submission completes
      setOpen(false); // Optionally close the modal if needed
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        onClick={() => setOpen(false)} // Close modal on background click
      >
        <div
          className="w-[500px] py-6 bg-white flex flex-col gap-6 rounded-lg border-2 border-black"
          onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from closing
        >
          <p className="text-center text-xl font-bold" id="modal-modal-title">
            ต้องการที่จะแก้ไขสินค้านี้ใช่หรือไม่
          </p>
          <div className="flex gap-6 w-full justify-evenly">
            <button
              className={`px-4 py-1 bg-yellow-300 hover:bg-[#F1C339] font-bold rounded-md ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={onSubmit}
              disabled={loading} // Disable the button during loading
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="loader"></span>{" "}
                  {/* You can customize this with a spinner */}
                  กำลังโหลด...
                </span>
              ) : (
                "ยืนยัน"
              )}
            </button>
            <button
              className="px-4 py-1 bg-[#4D4D4E] hover:bg-[#39393a] font-bold rounded-md text-white"
              onClick={(e) => {
                e.stopPropagation(); // Stop the event from propagating
                setOpen(false); // Close the modal
              }}
              disabled={loading} // Optionally disable cancel during loading
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
