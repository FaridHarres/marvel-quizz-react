import React, { useRef, useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom';


const Landing = () => {

    const refWolverine = useRef(null)
    // console.log(refWolverine) sont curent est null


    useEffect(() => {
        refWolverine.current.classList.add('startingImg')
        setTimeout(() => {
            refWolverine.current.classList.remove('startingImg')
            setBtn(true)
        }, 2000)

    }, [])// en mettant un Array vide cela veut dire que cette fonction va etre appelé seulement au moment du montage de la page


    const [btn, setBtn] = useState(false)

    const setleftImg = ()=>{
        refWolverine.current.classList.add('leftImg')
    }
    const setrightImg =()=>{
        refWolverine.current.classList.add('rightImg')

    }
    const clearImg =()=>{
        if (refWolverine.current.classList.contains('leftImg')) {
            refWolverine.current.classList.remove('leftImg')
        }else if(refWolverine.current.classList.contains('rightImg')){
            refWolverine.current.classList.remove('rightImg')

        }
    }


    //si le btn = true
    const displayBtn =  btn && (
        <Fragment>
            <div onMouseOver={setleftImg} onMouseOut={clearImg} className='leftBox'>
                <Link className='btn-welcome' to="/signup">inscription</Link>
            </div>
            <div className='rightBox'>
                <Link onMouseOver={setrightImg}  to="/login" onMouseOut={clearImg} className='btn-welcome'>connexion</Link>
            </div>
        </Fragment>

)

    //nous avons pu mettre dans le current, tout le main

    return (
        <main ref={refWolverine} className='welcomePage'>
            {displayBtn}
        </main>
    )
}

export default Landing