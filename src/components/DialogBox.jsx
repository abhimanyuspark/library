import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const DialogBox = ({ open, setOpen, children }) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="flex w-full flex-col gap-4 rounded-md overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <div className="flex justify-between items-center w-full">
                <h3>Save Books</h3>
                <button type="button" onClick={() => setOpen(false)}>
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {children}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogBox;
