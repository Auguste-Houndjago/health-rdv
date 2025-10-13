"use client"
import Image from 'next/image';
import React, { useState } from 'react';

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Recherche medicale',
    imageUrl: '/hero.jpg',
  },
  {
    id: 2,
    title: 'Prise de rendez-vous',
    imageUrl: '/hero.jpg',
  },
  {
    id: 3,
    title: 'Diagnostique ',
    imageUrl: '/hero.jpg',
  },
  {
    id: 4,
    title: 'Assistance',
    imageUrl: '/hero.jpg',
  },
    {
      id: 5,
      title: 'Une vision unique',
      imageUrl: '/hero.jpg',
    },
    // {
    //   id: 6,
    //   title: 'Visual Understanding',
    //   imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
    // },
    // {
    //   id: 7,
    //   title: 'Visual Understanding',
    //   imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
    // },
    
];

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }) => {
  return (
    <div
      className={`
        relative h-full rounded-md overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[530px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <Image
        src={item.imageUrl}
        alt={item.title}
        className={`absolute z-1 ${isActive ? 'opacity-90' : 'opacity-40'} inset-0 w-full h-full object-cover`}
        fill
        sizes="(max-width: 768px) 100vw, 530px"
        priority={isActive}
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white z-2 text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0 hover:opacity-100 hover:scale-105   text-outline-black' // Active state: horizontal, bottom-center
              // Inactive state: vertical, positioned at the bottom, for all screen sizes
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};


// --- Main App Component ---
export function LangingImages() {
  const [activeIndex, setActiveIndex] = useState(4);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
            <div className="flex w-full  flex-row justify-start gap-1 overflow-x-auto scrollbar-hidden">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
  );
}
