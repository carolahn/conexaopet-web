export const personalityChoices = [
  { id: 1, value: 'calmo'},
  { id: 2, value: 'agitado'},
  { id: 3, value: 'assustado'},
  { id: 4, value: 'amoroso'},
  { id: 5, value: 'enérgico'},
  { id: 6, value: 'quieto'},
  { id: 7, value: 'dócil'},
  { id: 8, value: 'bravo'},
  { id: 9, value: 'sociável'},
  { id: 10, value: 'não sociável'},
];

export const getPersonalityString = (personalityIds) => {
  const personalityStrings = personalityIds.map(id => {
    const personality = personalityChoices.find(choice => choice.id === id);
    return personality ? personality.value : null;
  });

  return personalityStrings.filter(Boolean).join(', ');
};

export const getAlongChoices = [
  { id: 1, value: 'cachorros' },
  { id: 2, value: 'gatos' },
  { id: 3, value: 'crianças' }
];

export const getAlongString = (getAlongIds) => {
  const getAlongStrings = getAlongIds.map(id => {
    const getAlong = getAlongChoices.find(choice => choice.id === id);
    return getAlong ? getAlong.value : null;
  });

  return getAlongStrings.filter(Boolean).join(', ');
};


export const lifeStageChoices = [
  { id: 1, value: 'filhote'},
  { id: 2, value: 'adulto'},
  { id: 3, value: 'idoso'},
];

export const getLifeStage = (ageYear) => {
  if (ageYear === 0) {
    return lifeStageChoices.find(choice => choice.id === 1).value;
  } else if (ageYear > 0 && ageYear <= 10) {
    return lifeStageChoices.find(choice => choice.id === 2).value;
  } else {
    return lifeStageChoices.find(choice => choice.id === 3).value;
  }
};

export const petTypeChoices = [
  { id: 1, value: 'cachorro'},
  { id: 2, value: 'gato'},
  { id: 3, value: 'outro'},
];

export const getPetType = (typeId) => {
  return petTypeChoices.find(choice => choice.id === typeId).value;
};