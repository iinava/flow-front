import create from "zustand";

const useStore = create((set) => ({
    isOpen: false,
    editValue: "",
    nodeId: null,
    setOpenTrue: () => set({ isOpen: true }),
    setOpenFalse: () => set({ isOpen: false }),
    setEditValue: (editValue) => set({ editValue }),
    setNodeId: (nodeId) => set({ nodeId }),
}));

export default useStore;
