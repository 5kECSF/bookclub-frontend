import { AddButton } from "@/components/admin/ui/cell-ui";
import { Filter, X } from "lucide-react";
interface TopButtonProps {
  add?: boolean;
  filter?: boolean;
  openModal: any;
  openDrawer: any;
}
export function TopButtons({
  add = true,
  filter = true,
  openModal,
  openDrawer,
}: TopButtonProps) {
  return (
    <div className="flex items-center justify-between">
      <div>{add && <AddButton onClick={() => openModal(true)} />}</div>

      {filter && (
        <button
          onClick={() => openDrawer(true)}
          className="mr-10 flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white"
        >
          <Filter className="h-5 w-5" />
          Filter
        </button>
      )}
    </div>
  );
}

export const FilterDrawer = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: any;
  children: any;
}) => {
  return (
    <div className="relative dark:bg-boxdark-2 dark:text-bodydark">
      {/* Button to Open Drawer */}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-5 z-50 h-full w-80 transform bg-white shadow-lg transition-transform duration-300 dark:bg-boxdark-2 dark:text-bodydark ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative p-4 py-10">
          <div className="relative p-4 py-10">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 hover:bg-red-600 absolute right-2 top-10 flex h-10 w-10 items-center justify-center rounded-full  text-red shadow-md"
            >
              <X />
            </button>
            <div className="mt-15 flex flex-col gap-4">
              {/*<p>Drawer Content Goes Here</p>*/}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
