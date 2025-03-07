import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="玩法" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        你有六次机会猜抽象成语，每个emoji代表一个或多个拼音。方块颜色会根据你的猜测结果的正确程度改变。
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        <br/>
        若正确答案为🟨huang🈚wu🧍ren👁yan (荒无人烟)，
      </p>
      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🟨" status="correct" />
        <Cell value="🔪" status="absent" />
        <Cell value="🐔" status="absent" />
        <Cell value="🌞" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        黄道吉日，其中🟨在正确的位置，因此方块会变成绿色。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🧍" status="present" />
        <Cell value="🐔" status="absent" />
        <Cell value="😓" status="absent" />
        <Cell value="🈯" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        人迹罕至，其中🧍有出现，但不在正确的位置，因此方块会变成黄色。
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        <br />
        而其他的emoji因为并没有出现，因此变成灰色
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        <br />
        注意一个emoji可能代表多个拼音，如🧍同时代表ren和zhan，💩同时代表shi和fen等。
      </p>
      <br />
      <br />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/TheodoreKrypton/react-wordle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
