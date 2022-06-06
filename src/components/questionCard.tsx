import React from 'react';

//import styles
import { Wrapper, ButtonWrapper } from './questionCard.styles';
//types import
import {AnsObject} from '../App'

type Sets = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userChoice: AnsObject | undefined;
    questionNo: number;
    totalQuestions: number
}

const QuestionCard: React.FC<Sets> =({question, answers, callback, userChoice, questionNo, totalQuestions})=>
    (<Wrapper>
        <p className='number'>
            Quesion: {questionNo}/{totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper
                correct={userChoice?.correctChoice === answer}
                userClicked={userChoice?.answer===answer}
                key={answer}>
                    <button disabled={userChoice ? true:false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html: answer}}/>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>)

export default QuestionCard