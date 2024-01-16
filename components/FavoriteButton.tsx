import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import useFavorites from '../hooks/useFavorites';
import useCurrentUser from '../hooks/useCurrentUser';

interface FavoriteButtonProps {
  movieId: string;
  size: number;
  sizeSm: number;
  sizeMd: number;
  sizeLg: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movieId,
  size,
  sizeSm,
  sizeMd,
  sizeLg,
}) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavorites = response?.data?.favoriteIds;

    mutateCurrentUser({
      ...currentUser,
      favoriteIds: updatedFavorites,
    });

    mutateFavorites();
  }, [movieId, currentUser, isFavorite, mutateCurrentUser, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className={`
    cursor-pointer
    group/item
    w-${size} sm:w-${sizeSm} md:w-${sizeMd} lg:w-${sizeLg} 
    h-${size} sm:h-${sizeSm} md:h-${sizeMd} lg:h-${sizeLg} 
    rounded-full
    border-2
    flex
    justify-center
    items-center
    transition
    hover:border-neutral-400
    `}
      onClick={toggleFavorites}>
      <Icon className="text-white text-2xl sm:text-xl" />
    </div>
  );
};

export default FavoriteButton;
