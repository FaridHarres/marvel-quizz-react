import React, { Fragment } from 'react'

const ProgressBar = ({idQuestion, maxQuestions}) => {
    // console.log(idQuestion, maxQuestions)

    const getWidth = (totalQuestions, questionId)=>{
        return (100/totalQuestions ) * questionId
    }

    const actualQst = idQuestion +1

    const progress = getWidth(maxQuestions, actualQst)
    return (
        <Fragment>
            <div className='percentage'>
                <div className='progressPercent'>{`Question : ${idQuestion +1}/ ${maxQuestions}`} </div>
                <div className='progressPercent'>{`Progression : ${progress}%`}</div>
            </div>
            <div className='progressBar'>
                <div className='progressBarChange' style={{width: `${progress}%`}}></div>

            </div>
        </Fragment>
    )
}

export default React.memo(ProgressBar)