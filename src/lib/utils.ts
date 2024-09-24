import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



/*
* @param array : 셔플하고자하는 숫자 배열 주소 ( 주소값자체를 전달받아 재배열함 )
*/
export function knuthShuffle(array:number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



/**
 *
 * @param alreadySelectedNums   : 이미선택한 번호 배열
 * @param exclusionNums   : 제외하고자하는 번호 배열
 * @returns {number[]}   : 랜덤추출된 번호 배열
 */
export function getRandomNumbers(alreadySelectedNums:number[], exclusionNums:number[]) :number[]{
  let numbers = Array.from({length: 45}, (_, index) => index + 1); // 1부터 45까지의 배열 생성

  // 이미 선택된 번호가 있을 경우 제외
  if(alreadySelectedNums){
    numbers = numbers.filter(v => !alreadySelectedNums.includes(v));
  }

  // 제외할 번호가 있을 경우 제외
  if(exclusionNums){
    numbers = numbers.filter(v => !exclusionNums.includes(v));
  }

  // 배열을 Knuth Shuffle로 섞음
  knuthShuffle(numbers);

  // (6 - 이미선택된번호) 만큼 추출
  let selectedNumbers = numbers.slice(0, 6-alreadySelectedNums.length);

  return selectedNumbers;
}