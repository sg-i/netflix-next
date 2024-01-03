import { useContext } from "react";
import { InfoModalContext, InfoModalContextType } from "../lib/context";

const useInfoModal = (): InfoModalContextType => {
    const context = useContext(InfoModalContext);
    if (!context) {
      throw new Error('useInfoModal must be used within an InfoModalProvider');
    }
    const {isOpen, closeModal, openModal, movieId}=context;
    return {
        isOpen, closeModal, openModal, movieId
    };
};
export default useInfoModal;
