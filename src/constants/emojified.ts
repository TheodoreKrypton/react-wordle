import { wordToEmoji } from "./emoji";
import { WORDS } from "./words";
import { VALID_GUESSES } from './validguesses';

export const emojifiedWords = WORDS.map(wordToEmoji);
export const emojifiedValidGuesses = VALID_GUESSES.map(wordToEmoji);