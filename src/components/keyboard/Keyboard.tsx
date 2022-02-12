import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect, useState } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'
import { solution } from '../../lib/words';
import { pinyin } from '../../constants/pinyin';
import { emoji } from '../../constants/emoji';

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

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[][]
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
}: Props) => {
  const [keys, setKeys] = useState([] as string[]);

  const charStatuses = getStatuses(guesses)

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  useEffect(() => {
    const pinyins = solution.split('').map(char => pinyin[char]);
    const emojis = new Set(pinyins.map(pinyin => emoji[pinyin]));
    const allEmojis = Array.from(new Set(Object.values(emoji).filter(emoji => emoji.length)));

    while (emojis.size < 26) {
      const idx = chooseRandom(allEmojis.length);
      const emoji : string = allEmojis[idx];
      if (!emojis.has(emoji)) {
        emojis.add(emoji);
      }
    }

    setKeys(shuffle(Array.from(emojis)));
  }, []);

  return (
    <div>
      <div className="flex justify-center mb-1">
        {keys.slice(0, 10).map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {keys.slice(10, 20).map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        {keys.slice(20, 26).map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}
