import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface InfoModalContextType {
  movieId?: string;
  isOpen: boolean;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const InfoModalContext = createContext<InfoModalContextType>({
  movieId: undefined,
  isOpen: false,
  openModal: (id: string) => null,
  closeModal: () => null,
});

interface InfoModalProviderProps {
  children: ReactNode;
}
export const InfoModalProvider: React.FC<InfoModalProviderProps> = ({ children }) => {
  const [movieId, setMovieId] = useState<undefined | string>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (id: string) => {
    setMovieId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setMovieId(undefined);
    setIsOpen(false);
  };

  return (
    <InfoModalContext.Provider value={{ movieId, isOpen, openModal, closeModal }}>
      {children}
    </InfoModalContext.Provider>
  );
};
