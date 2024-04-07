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

export const petGenderChoices = [
  { id: 'M', value: 'macho'},
  { id: 'F', value: 'fêmea'},
];

export const petSizeChoices = [
  { id: 1, value: 'miniatura'},
  { id: 2, value: 'pequeno'},
  { id: 3, value: 'médio'},
  { id: 4, value: 'grande'},
];

export const getPetSize = (weight) => {
  if (weight <= 6) {
    return 1;
  } else if (weight <= 15) {
    return 2;
  } else if (weight <= 25) {
    return 3;
  } else {
    return 4;
  }
};



// export const calculateSizeFromWeight = () => {
//   const weightValue = parseFloat(weight);

//   if (weightValue <= 5) {
//     setSelectedSize('1'); // Size 1: Miniatura
//   } else if (weightValue <= 10) {
//     setSelectedSize('2'); // Size 2: Pequeno
//   } else if (weightValue <= 25) {
//     setSelectedSize('3'); // Size 3: Médio
//   } else if (weight > 25) {
//     setSelectedSize('4'); // Size 4: Grande
//   } else {
//     setSelectedSize('');
//   }
// };

export function getBreedId(value) {
  const breed = petBreedChoices.find(breed => breed.value === value);
  return breed ? breed.id : null;
}

export const petBreedChoices = [
  { id: 1, value: 'SRD' },
  { id: 2, value: 'akita' },
  { id: 3, value: 'basset hound' },
  { id: 4, value: 'beagle' },
  { id: 5, value: 'bernese mountain dog' },
  { id: 6, value: 'bichon frise' },
  { id: 7, value: 'bloodhound' },
  { id: 8, value: 'border collie' },
  { id: 9, value: 'boston terrier' },
  { id: 10, value: 'boxer' },
  { id: 11, value: 'bulldog' },
  { id: 12, value: 'cavalier king charles spaniel' },
  { id: 13, value: 'chihuahua' },
  { id: 14, value: 'chow chow' },
  { id: 15, value: 'cocker spaniel' },
  { id: 16, value: 'collie' },
  { id: 17, value: 'corgi' },
  { id: 18, value: 'dachshund' },
  { id: 19, value: 'dalmatian' },
  { id: 20, value: 'doberman' },
  { id: 21, value: 'english mastiff' },
  { id: 22, value: 'german shepherd' },
  { id: 23, value: 'golden retriever' },
  { id: 24, value: 'great dane' },
  { id: 25, value: 'husky' },
  { id: 26, value: 'irish setter' },
  { id: 27, value: 'italian greyhound' },
  { id: 28, value: 'jack russell terrier' },
  { id: 29, value: 'labrador retriever' },
  { id: 30, value: 'maltese' },
  { id: 31, value: 'newfoundland' },
  { id: 32, value: 'pomeranian' },
  { id: 33, value: 'poodle' },
  { id: 34, value: 'pug' },
  { id: 35, value: 'rhodesian ridgeback' },
  { id: 36, value: 'rottweiler' },
  { id: 37, value: 'saint bernard' },
  { id: 38, value: 'samoyed' },
  { id: 39, value: 'shar pei' },
  { id: 40, value: 'shiba inu' },
  { id: 41, value: 'shih tzu' },
  { id: 42, value: 'siberian husky' },
  { id: 43, value: 'staffordshire bull terrier' },
  { id: 44, value: 'vizsla' },
  { id: 45, value: 'weimaraner' },
  { id: 46, value: 'yorkshire terrier' },
  { id: 47, value: 'australian shepherd' },
  { id: 48, value: 'border terrier' },
  { id: 49, value: 'brittany spaniel' },
  { id: 50, value: 'cane corso' },
  { id: 51, value: 'cavalier king charles spaniel' },
  { id: 52, value: 'chinese crested' },
  { id: 53, value: 'english bulldog' },
  { id: 54, value: 'french bulldog' },
  { id: 55, value: 'german shorthaired pointer' },
  { id: 56, value: 'irish wolfhound' },
  { id: 57, value: 'italian greyhound' },
  { id: 58, value: 'japanese chin' },
  { id: 59, value: 'keeshond' },
  { id: 60, value: 'labrador retriever' },
  { id: 61, value: 'maltese' },
  { id: 62, value: 'newfoundland' },
  { id: 63, value: 'norwegian elkhound' },
  { id: 64, value: 'otterhound' },
  { id: 65, value: 'papillon' },
  { id: 66, value: 'pekingese' },
  { id: 67, value: 'pomeranian' },
  { id: 68, value: 'poodle' },
  { id: 69, value: 'pug' },
  { id: 70, value: 'redbone coonhound' },
  { id: 71, value: 'rhodesian ridgeback' },
  { id: 72, value: 'saluki' },
  { id: 73, value: 'samoyed' },
  { id: 74, value: 'schipperke' },
  { id: 75, value: 'scottish deerhound' },
  { id: 76, value: 'shiba inu' },
  { id: 77, value: 'shihtzu' },
  { id: 78, value: 'siberian husky' },
  { id: 79, value: 'silky terrier' },
  { id: 80, value: 'staffordshire bull terrier' },
  { id: 81, value: 'tibetan mastiff' },
  { id: 82, value: 'vizsla' },
  { id: 83, value: 'weimaraner' },
  { id: 84, value: 'whippet' },
  { id: 85, value: 'yorkshire terrier' },
  { id: 86, value: 'affenpinscher' },
  { id: 87, value: 'airedale terrier' },
  { id: 88, value: 'akita' },
  { id: 89, value: 'alaskan malamute' },
  { id: 90, value: 'american eskimo dog' },
  { id: 91, value: 'american pit bull terrier' },
  { id: 92, value: 'american staffordshire terrier' },
  { id: 93, value: 'anatolian shepherd dog' },
  { id: 94, value: 'australian cattle dog' },
  { id: 95, value: 'australian shepherd' },
  { id: 96, value: 'australian terrier' },
  { id: 97, value: 'basenji' },
  { id: 98, value: 'basset hound' },
  { id: 99, value: 'beagle' },
  { id: 100, value: 'bedlington terrier' },
];