
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCharacters, selectCharacters } from '../features/characters/charactersSlice';
import { startConversation } from '../features/conversations/conversationsSlice';

const CharacterSelectionPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const characters = useSelector(selectCharacters);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const handleCharacterClick = async (characterId: string) => {
    try {
      const conversationId = await dispatch(startConversation(characterId));
      history.push(`/conversation/${conversationId}`);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  return (
    <div className="container">
      <h2>Select a Character</h2>
      <div className="character-list">
        {characters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            onClick={() => handleCharacterClick(character.id)}
          >
            <h3>{character.name}</h3>
            <p>{character.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelectionPage;

