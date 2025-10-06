import React from 'react';
import SermonCard from './SermonCard';

const SermonGrid = ({ sermons, categories, onPlay }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sermons.map((sermon) => (
        <SermonCard
          key={sermon.id}
          sermon={sermon}
          categoryLabel={categories.find(cat => cat.value === sermon.category)?.label || 'Teaching'}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
};

export default SermonGrid;
