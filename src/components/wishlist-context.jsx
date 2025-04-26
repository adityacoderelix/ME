
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlists, setWishlists] = useState({
    stays: [],
    experiences: [],
    folders: {}
  });

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStaysWishlist = localStorage.getItem('staysWishlist');
      const savedExperiencesWishlist = localStorage.getItem('experiencesWishlist');
      const savedFolders = localStorage.getItem('folders');
      
      const newWishlists = {
        stays: savedStaysWishlist ? JSON.parse(savedStaysWishlist) : [],
        experiences: savedExperiencesWishlist ? JSON.parse(savedExperiencesWishlist) : [],
        folders: savedFolders ? JSON.parse(savedFolders) : {}
      };
      
      setWishlists(newWishlists);
    }
  }, []);

  // Save to localStorage whenever wishlists change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('staysWishlist', JSON.stringify(wishlists.stays));
      localStorage.setItem('experiencesWishlist', JSON.stringify(wishlists.experiences));
      localStorage.setItem('folders', JSON.stringify(wishlists.folders));
    }
  }, [wishlists]);

  const addToWishlist = (item, destination) => {
    setWishlists(prev => {
      // If destination is a custom folder
      if (prev.folders.hasOwnProperty(destination)) {
        return {
          ...prev,
          folders: {
            ...prev.folders,
            [destination]: {
              ...prev.folders[destination],
              items: [...prev.folders[destination].items, item]
            }
          }
        };
      }
      
      // If destination is stays or experiences
      if (destination === 'stays' || destination === 'experiences') {
        // Check if item already exists in the destination
        const existingList = prev[destination];
        if (!existingList.some(existingItem => existingItem.id === item.id)) {
          return {
            ...prev,
            [destination]: [...existingList, item]
          };
        }
      }
      return prev;
    });
  };

  const removeFromWishlist = (itemId, destination) => {
    setWishlists(prev => {
      // If removing from a custom folder
      if (prev.folders[destination]) {
        return {
          ...prev,
          folders: {
            ...prev.folders,
            [destination]: {
              ...prev.folders[destination],
              items: prev.folders[destination].items.filter(item => item.id !== itemId)
            }
          }
        };
      }
      
      // If removing from stays or experiences
      if (destination === 'stays' || destination === 'experiences') {
        return {
          ...prev,
          [destination]: prev[destination].filter(item => item.id !== itemId)
        };
      }
      return prev;
    });
  };

  const isInWishlist = (itemId, destination) => {
    // Check in a specific folder
    if (wishlists.folders[destination]) {
      return wishlists.folders[destination].items.some(item => item.id === itemId);
    }
    
    // Check in stays or experiences
    if (destination === 'stays' || destination === 'experiences') {
      return wishlists[destination].some(item => item.id === itemId);
    }
    
    // Check everywhere if no destination specified
    return (
      wishlists.stays.some(item => item.id === itemId) ||
      wishlists.experiences.some(item => item.id === itemId) ||
      Object.values(wishlists.folders).some(folder => 
        folder.items.some(item => item.id === itemId)
      )
    );
  };

  const createFolder = (folderName) => {
    const folderId = folderName.toLowerCase().replace(/\s+/g, '-');
    setWishlists(prev => ({
      ...prev,
      folders: {
        ...prev.folders,
        [folderId]: {
          name: folderName,
          items: [],
          createdAt: new Date().toISOString()
        }
      }
    }));
  };

  return (
    <WishlistContext.Provider value={{
      wishlists,
      staysWishlist: wishlists.stays,
      experiencesWishlist: wishlists.experiences,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      createFolder
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

export default WishlistContext;