import React from 'react'
import batman from '../../images/batman.png'

const centerH2 ={
    textAlign: 'center',
    marginTop: '50px'

}

const centerImg = {
    display : 'block',
    margin: '40px auto'

}

const Errorpage = () => {
  return (
    <div className='quiz-bg'>
        <div className='container'>
            <h2 style={centerH2}>OUPS CETTE PAGE N'EXISTE PAS</h2>
            <img src={batman}  style={centerImg}></img>
        </div>

    </div>
  )
}

export default Errorpage