'use client';

import { useMemo, useRef, useState } from 'react';
import LottoNumberPickerWithTailWind from '@/components/LottoNumberPickerWithTailWind';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getRandomNumbers } from '@/utils/utils';

export default function LotteryPage() {
  // 0: 미선택 , 1: 선택, 2:제외
  const [pickNum, setPickNum] = useState(
    Array.from({ length: 45 }, (v, i) => 0),
  );
  const [isExclusionMode, setExclusionMode] = useState(false);

  const ref = useRef<number[][]>([]);

  function handleClickRandom() {
    // 현재 이미 선택된 번호와 제외된 번호를 따로 추출
    let alreadySelectedNums: number[] = [];
    let exclusionNums: number[] = [];
    pickNum.forEach((v, i) => {
      if (v == 1) alreadySelectedNums.push(i + 1);
      if (v == 2) exclusionNums.push(i + 1);
    });

    // 선택된 번호가 6개이면 초기화
    if (alreadySelectedNums.length == 6) {
      alreadySelectedNums.length = 0;
    }

    // 랜덤번호 추출
    const rNum = getRandomNumbers(alreadySelectedNums, exclusionNums);

    let arr: number[] = [];
    // 뽑은 번호를 반영
    // 1) 번호가 6개일경우에만 초기화후 새로운 번호로 반영
    // 2) 번호가 6개미만일경우에는 나머지번호만 랜덤추출
    // 3) 제외할 번호는 항상 그대로 유지
    setPickNum((pre) => {
      // 새로운배열반환
      const newArr = pre.map((value, index) => {
        // 제외할 번호는 그대로 유지
        if (value == 2) return 2;

        // 선택된 번호
        if (rNum.includes(index + 1)) {
          arr.push(index + 1);
          return 1;
        }

        // 선택 가능한 번호가 6개 미만일때 이전 선택 유지
        if (rNum.length < 6 && value === 1) {
          arr.push(index + 1);
          return 1;
        }

        return 0;
      });
      return newArr;
    });

    // 기록 보관을 위해 추첨번호 추출
    ref.current.push(arr);
    //console.log(ref.current);
  }

  function handleClickReset() {
    setPickNum(Array.from({ length: 45 }, (_, i) => 0));
  }

  return (
    <main>
      <div className="flex flex-col items-center gap-2">
        <p className={'text-2xl font-bold mt-6'}>로또 번호 생성기-최종인가</p>
        <LottoNumberPickerWithTailWind
          pickNum={pickNum}
          setPickNum={setPickNum}
          isExclusionMode={isExclusionMode}
        />

        <div className="flex flex-col gap-2 w-[182px]">
          <Button onClick={handleClickRandom} disabled={isExclusionMode}>
            랜덤번호추천
          </Button>
          {isExclusionMode ? (
            <Button
              onClick={() => setExclusionMode(false)}
              className="btn-animated"
            >
              완료
            </Button>
          ) : (
            <Button onClick={() => setExclusionMode(true)}>
              제외할번호선택
            </Button>
          )}
          <Button onClick={handleClickReset} disabled={isExclusionMode}>
            리셋
          </Button>
        </div>

        <div className={'flex gap-2 items-center'}>
          {pickNum.filter((value) => value == 1).length != 0 && (
            <p className={'text-xl font-bold'}>선택한 번호 :</p>
          )}

          {pickNum.map((value, index) => {
            if (value === 1) {
              return (
                <Image
                  key={index}
                  src={`/images/nums/ball_${index + 1}.png`}
                  alt={`${index + 1}번`}
                  width="45"
                  height="45"
                />
              );
            }
            return null;
          })}
        </div>
        <div className={'flex gap-3 mt-6'}>
          <div>
            {ref.current.length != 0 && (
              <>
                <p className={'text-xl font-bold'}>기록 :</p>
                <Button
                  className={'p-1 w-[3.2rem] h-[2rem]'}
                  onClick={() => {
                    ref.current = [];
                    setPickNum([...pickNum]);
                  }}
                >
                  삭제
                </Button>
              </>
            )}
          </div>
          <div>
            {ref.current.map((value, index) => (
              <p key={index} className="flex mb-2 gap-1">
                {value.map((v, i) => (
                  <Image
                    key={i}
                    src={`/images/nums/ball_${v}.png`}
                    alt={`${v}번`}
                    width="30"
                    height="30"
                  />
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
