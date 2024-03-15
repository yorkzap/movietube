import React, { useState } from 'react';
import './CastList.css';
import ActorBooks from './ActorBooks';

function CastList({ cast }) {
  const [selectedActor, setSelectedActor] = useState(null);
  const [hoveredActor, setHoveredActor] = useState(null);

  const handleActorClick = (actorName) => {
    setSelectedActor(actorName === selectedActor ? null : actorName);
    setHoveredActor(null);
  };

  const handleActorHover = (actorName) => {
    if (!selectedActor) {
      setHoveredActor(actorName);
    }
  };

  const handleMouseLeave = () => {
    setHoveredActor(null);
  };

  return (
    <div className="cast-list">
      <div className="slider">
        {cast.map((castMember, index) => (
          <div className="slide" key={index}>
            <div
              className={`cast-member ${selectedActor === castMember.name ? 'selected' : ''}`}
              onClick={() => handleActorClick(castMember.name)}
              onMouseEnter={() => handleActorHover(castMember.name)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="cast-image">
                {castMember.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
                    alt={`${castMember.name}`}
                  />
                )}
                {hoveredActor === castMember.name && (
                  <div className="hover-text">Click for more</div>
                )}
              </div>
              <div className="cast-details">
                <p className="cast-name">{castMember.name}</p>
                <p className="cast-character">as {castMember.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedActor && <ActorBooks actorName={selectedActor} />}
    </div>
  );
}

export default CastList;
