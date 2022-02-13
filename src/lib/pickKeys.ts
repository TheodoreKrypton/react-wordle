import { pinyin } from '../constants/pinyin';
import { emoji } from '../constants/emoji';
import { emojifiedWords } from '../constants/emojified';

type Relation = {
	[key: string] : number
}

type Relations = {
	[key: string] : Relation
}

const relations : Relations = {}

const buildRelations = () => {
	emojifiedWords.forEach((word) => {
    const emojis = word.split(',');
		for (let i = 0; i < emojis.length; i++) {
			for (let j = 0; j < emojis.length; j++) {
				if (i === j) {
					continue
				}
				if (!relations[emojis[i]]) {
					relations[emojis[i]] = {}
				}
				if (relations[emojis[i]][emojis[j]]) {
					relations[emojis[i]][emojis[j]] += 1;
				} else {
					relations[emojis[i]][emojis[j]] = 1;
				}
			}
		}
	})
}

buildRelations();

const chooseRandom = (max: number) => {
  return Math.floor(Math.random() * (max - 0.1));
};

function shuffle(array: any[]) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {
    randomIndex = chooseRandom(currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const pickWordWithEmojis = (emojis: string[], pickedWords: Set<string>) => {
  const numWords = emojifiedWords.length;
  let randomI = chooseRandom(numWords);
  const end = randomI - 1 < 0 ? numWords : randomI - 1;
  while (randomI !== end) {
    const word = emojifiedWords[randomI];
    const wordEmojis = word.split(',');
    if (emojis.every(emj => wordEmojis.includes(emj)) && !pickedWords.has(word)) {
      return wordEmojis;
    }
    randomI = (randomI + 1) % numWords;
  }
  return null;
}

export const pickKeys = (solution: string) => {
  const emojis = solution.split('').map(char => emoji[pinyin[char]]);
  const emojisSet = new Set(emojis);
  const pickedWords = new Set([emojis.join(',')]);

  let i = 0;
  const records: Map<number, number> = new Map();
  while (emojisSet.size < 12) {
    const j = i % emojis.length;
    if (!records.get(j)) {
      records.set(j, pickedWords.size);
    } else {
      if (records.get(j) === pickedWords.size) {
        break
      } else {
        records.set(j, pickedWords.size);
      }
    }

    const emj = emojis[j];
    
    let secondEmoji = "";
    for (var k = 0; k < emojis.length; k++) {
      if (relations[emj][emojis[k]]) {
        secondEmoji = emojis[k];
      }
    }

    let pickedWord : string[] | null = [];

    if (secondEmoji === "") {
      pickedWord = pickWordWithEmojis([emj], pickedWords);
    } else {
      delete relations[emj][k];
      pickedWord = pickWordWithEmojis([emj, secondEmoji], pickedWords);
    }

    if (pickedWord) {
      pickedWord.forEach(emj => {
        emojis.push(emj);
        emojisSet.add(emj);
      });
      pickedWords.add(pickedWord.join(','));
    }

    i += 1
  }

  return shuffle(Array.from(emojisSet));
}