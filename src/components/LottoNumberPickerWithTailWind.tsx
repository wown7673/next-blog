import styled, {css, keyframes} from "styled-components";
import {ChangeEvent, Dispatch, SetStateAction} from "react";


export default function LottoNumberPicker({pickNum, setPickNum , isExclusionMode} : {pickNum:number[], setPickNum:Dispatch<SetStateAction<number[]>>, isExclusionMode:boolean} ) {

    function toggleCheckBox(num:number,e:  ChangeEvent<HTMLInputElement>){
        const value = Number(e.target.value);


        // 선택모드 번호선택 6개 제한
        if(!isExclusionMode && pickNum.filter(v=>v==1).length>=6 && (value ==0) ){
            alert("6개만 선택가능합니다");
            return;
        }

        setPickNum((prev)=>{
            if(isExclusionMode && value != 1){
                prev[num-1] = value!=2 ? 2 : 0;  // 제외모드일 경우( 번호2번세팅 )
            }else if(!isExclusionMode && value != 2){
                prev[num-1] = value==0 ? 1 : 0;  // 선택모드일 경우( 번호 1번 세팅 )
            }

            return [...prev];    // 새로운 배열을 반환 안 하면 재랜더링안됨!
        });
    }

    // 로또용지 렌더링
    const numArr = Array.from({ length: 45 }, (_, idx) => idx + 1);
    const result = [];
    for (let i = 0; i < numArr.length; i++) {
        if (i % 7 === 0) {
            // 7개의 <td>를 하나의 <tr>로 묶음
            const tdElements = [];
            for (let j = 0; j < 7; j++) {
                const currentIndex = i + j;
                if(currentIndex>=45) break;
                tdElements.push(
                    <td key={currentIndex}>
                        <input type={"checkbox"}
                               className="peer hidden"
                               id={`num${numArr[currentIndex]}`}
                               value={pickNum[currentIndex]}
                               checked={pickNum[currentIndex] == 0 ? false : true}
                               onChange={(e) => toggleCheckBox(numArr[currentIndex], e)}
                        />

                        <label
                            htmlFor={`num${numArr[currentIndex]}`}
                            className={`inline-block w-[30px] h-[38px] border border-solid border-[1px] border-[red] cursor-pointer relative mx-[2px] my-[2.5px] text-[12px] text-[#ff0000] text-center leading-[38px] select-none
                                   before:content-[''] before:bg-white before:absolute before:left-[-1px] before:top-[20%] before:bottom-[20%] before:w-[1px]
                                   after:content-[''] after:bg-white after:absolute after:right-[-1px] after:top-[20%] after:bottom-[20%] after:w-[1px]
                                   peer-checked:w-[30px] peer-checked:h-[38px] peer-checked:border-none peer-checked:text-white peer-checked:bg-blue-700
                                   font-bold text-[1.1rem]
                                   ${pickNum[currentIndex] == 2 && "bg-[#555555] opacity-[0.2]"}
                                   `}>
                            {numArr[currentIndex]}
                        </label>
                    </td>
                );
            }
            result.push(<tr key={`row${i / 7 + 1}`}>{tdElements}</tr>);
        }
    }

    return (
        <table
            className={`border-solid border-2 ${isExclusionMode ? "animate-[shimmer_1.5s_infinite_linear]" : "border-red-600 "} `}>
            <tbody>
            {result}
            </tbody>
        </table>
    );
}
