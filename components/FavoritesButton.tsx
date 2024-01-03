import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import useFavorites from '../hooks/useFavorites';
import useCurrentUser from '../hooks/useCurrentUser';

interface FavoritesButtonProps {
  movieId: string;
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({ movieId }) => {
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
      className="
    cursor-pointer
    group/item
    w-6
    h-6
    lg:w-10
    lg:h-10
    rounded-full
    border-2
    flex
    justify-center
    items-center
    transition
    hover:border-neutral-400
    "
      onClick={toggleFavorites}>
      <Icon className="text-white" size={30} />
    </div>
  );
};

export default FavoritesButton;
