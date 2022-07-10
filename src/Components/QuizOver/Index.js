import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import Loader from '../Loader/Index';
import Modal from '../Modal/Index';
import axios from 'axios';

const QuizOver = React.forwardRef((props, ref) => {
    //  console.log(props)
    //  console.log(ref)

    const { levelNames, score, maxQuestions, quizLevel, percent, loadLevelQst } = props;

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
    // console.log(API_PUBLIC_KEY)
    const hash = 'cd8de267e965fab3788fc27e9d40749c';

    const [asked, setasked] = useState([])
    //console.log(asked)
    const [openModal, setOpenModal] = useState(false)

    const [characterData, setCharacterData] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setasked(ref.current)

        if (localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate')
            checkDataAge(date)
        }
    }, [ref])

    const checkDataAge = (date) => {
        const today = Date.now();
        const timedif = today - date;

       const daysDif= timedif / (1000* 3600* 24)

       if(daysDif>= 15){
           localStorage.clear();
           localStorage.setItem('marvelStorageDate', Date.now());
           
       }
    }

    const averaGrade = maxQuestions / 2

    const showModal = (id) => {
        setOpenModal(true)
        if (localStorage.getItem(id)) {
            setCharacterData(JSON.parse(localStorage.getItem(id)));
            setLoading(false)


        } else {

            axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}
            `).then((response) => {
                setCharacterData(response.data);
                setLoading(false)

                localStorage.setItem(id, JSON.stringify(response.data));
                if (!localStorage.getItem('marvelStorageDate')) {

                    localStorage.setItem('marvelStorageDate', Date.now());
                }

            }).catch((error) =>
                console.log(error)
            )
        }

    }
    const hideModal = () => {
        setOpenModal(false)
        setLoading(true)
    }

    //si pas la moyenne
    if (score < averaGrade) {
        setTimeout(() => {
            loadLevelQst(quizLevel)
        }, 3000)

    }

    const decision = score >= averaGrade ? (
        <Fragment>
            <div className='stepsBtnContainer'>
                {quizLevel < levelNames.length ?
                    (
                        <Fragment>
                            <p className='successMsg'> <GiTrophyCup size='50px' />Bravo, passez au niveau suivant</p>
                            <button className='btnResult success' onClick={() => loadLevelQst(quizLevel)}>Niveau suivant</button>
                        </Fragment>

                    ) : (
                        <Fragment>
                            <p className='successMsg'>Bravo,Vous etes un expert</p>
                            <button className='btnResult gameOver' onClick={() => loadLevelQst(0)}>Accueil</button>
                        </Fragment>
                    )}
            </div>
            <div className='percentage'>
                <div className='progressPercent'>Réussite: {percent}%</div>
                <div className='progressPercent'>Note : {score}/{maxQuestions}</div>

            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className='stepsBtnContainer'>
                <p className='failureMsg'>Oups, vous avez echoué</p>
            </div>
            <div className='percentage'>
                <div className='progressPercent'>Réussite: {percent}%</div>
                <div className='progressPercent'>Note : {score}/{maxQuestions}</div>
            </div>

        </Fragment>
    )


    const questionAnswer = score >= averaGrade ? (
        asked.map((question) => {
            return (
                <tr key={question.id}>
                    <td>
                        {question.question}
                    </td>
                    <td>
                        {question.answer}
                    </td>
                    <td>
                        <button className='btnInfo' onClick={() => showModal(question.heroId)}>info</button>
                    </td>
                </tr>)
        })
    ) : (
        <tr>
            <td colspan="3">
                <Loader loadingMsg={"pas de réponse"} styling={{ textAlign: 'center', color: 'red' }} />

            </td>
        </tr>
    )

    const resultInModal = !loading ? (
        <Fragment>
            <div className='modalHeader'>
                <h2>{characterData.data.results[0].name}</h2>
            </div>
            <div className='modalBody'>
                <div className='comicImage'>
                    <img src={characterData.data.results[0].thumbnail.path+'.'+characterData.data.results[0].thumbnail.extension}/>
                    {characterData.attributionText}
                </div>
                <div className='comicDetails'>
                    <h3>Description</h3>
                    {
                        characterData.data.results[0].description ? <p>{characterData.data.results[0].description }</p> : <p>Description indisponible</p>
                    }
                    <h3>Plus d'info</h3>
                    {
                        characterData.data.results[0].urls && 
                        characterData.data.results[0].urls.map((url, index)=>{
                            return <a key={index} href={url.url} target='_blank' rel='noopener noreferrer'>{url.type}</a>
                        })

                    }
                </div>
            </div>
            <div className='modalFooter'>
                <button className='modalBtn' onClick={hideModal}>Fermer</button>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className='modalHeader'>
                <h2>Réponse de Marvel</h2>
            </div>
            <div className='modalBody'>
                <Loader />
            </div>

        </Fragment>
    )

    return (

        <Fragment>
            {decision}
            <hr />

            <p>Les réponses aux questions posées: </p>
            <div className='answerContainer'>
                <table className='answers'>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Reponse</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>

            </div>
            <Modal showModal={openModal} hideModal={hideModal}>
                {resultInModal}
            </Modal>


        </Fragment>
    )
})



export default React.memo(QuizOver)