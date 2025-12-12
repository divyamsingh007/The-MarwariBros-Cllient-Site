import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistService } from '../api/services';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get user from localStorage
  const getUser = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user;
    } catch {
      return null;
    }
  };

  // Load wishlist on mount
  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const user = getUser();
    if (!user?._id) return;

    try {
      setLoading(true);
      const response = await wishlistService.get(user._id);
      const items = response.data.data?.items || response.data.data?.wishlist?.items || [];
      setWishlist(items);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    const user = getUser();
    if (!user?._id) {
      alert('Please login to add items to wishlist');
      return false;
    }

    try {
      setLoading(true);
      const response = await wishlistService.addItem(user._id, productId);
      await loadWishlist(); // Reload wishlist
      return true;
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      alert(error.response?.data?.message || 'Failed to add to wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    const user = getUser();
    if (!user?._id) return false;

    try {
      setLoading(true);
      await wishlistService.removeItem(user._id, productId);
      await loadWishlist(); // Reload wishlist
      return true;
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      alert(error.response?.data?.message || 'Failed to remove from wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product?._id === productId || item.product === productId);
  };

  const clearWishlist = async () => {
    const user = getUser();
    if (!user?._id) return false;

    try {
      setLoading(true);
      await wishlistService.clear(user._id);
      setWishlist([]);
      return true;
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        loadWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
