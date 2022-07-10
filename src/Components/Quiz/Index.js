import React, { Component, Fragment } from 'react'
import Levels from '../Levels/Index';
import ProgressBar from '../ProgressBar/Index';
import { QuizMarvel } from '../quizMarvel/Index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import QuizOver from '../QuizOver/Index'
import { FaChevronRight } from 'react-icons/fa';



toast.configure();

class Quiz extends Component {

  constructor(props){
    super(props)
    this.initialState = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      showWelcomemsg: false,
      quizEnd: false
    }
    this.state=this.initialState

    
  }

  

  storedDataRef = React.createRef();

  loadQuestion = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz]
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz
      // jenleve les reponse et je garde le reste
      const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest)
      this.setState({
        storedQuestions: newArray
      })
    } else {
      console.log("pas assez de qst")
    }
  }

  showWelcomemsg = (pseudo) => {

    if (!this.state.showWelcomemsg) {
      this.setState({
        showWelcomemsg: true
      })
      toast.warn(`Bienvenue ${pseudo}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });

    }

  }

  //methode de cycle de vie
  componentDidMount() {
    this.loadQuestion(this.state.levelNames[this.state.quizLevel])
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.state.storedQuestions !== prevState.storedQuestions)&&(this.state.storedQuestions.length)) {


      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options


      })

    }
    if ((this.state.idQuestion !== prevState.idQuestion)&& this.state.storedQuestions.length) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,

      })
    }

    if(this.state.quizEnd !== prevState.quizEnd){
      const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score)
      this.gameOver(gradePercent)
    }
    if (this.props.userData.pseudo) {
      this.showWelcomemsg(this.props.userData.pseudo)
    }

  }





  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      // console.log("gameover")
     //
     this.setState({
      quizEnd : true
     })
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1

      }))
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1
        //il faut allimenter le component did update
      }))
      toast.success('Bravo +1!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "grow-font-size",
      });
    } else {
      toast.error('Mauvaise reponse ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }

  submitAnswer = (option) => {
    this.setState({
      userAnswer: option,
      btnDisabled: false
    })
  }

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;



  gameOver = (percent) => {
    
    if(percent >=50 ){
      this.setState({
        quizLevel: this.state.quizLevel +1,
        percent: percent,
        
      })
    }else{
      this.setState({
       
        percent: percent,
        
      })
    }
  
  }

  loadLevelQst=(param)=>{
    this.setState({...this.initialState, quizLevel: param

    })
    this.loadQuestion(this.state.levelNames[param])
  }

  render() {

    // const {pseudo}=this.props.userData;

    const displayoption = this.state.options.map((option, index) => {
      return (
        <p key={index} className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`} onClick={() => this.submitAnswer(option)}>
          
        <FaChevronRight/>  {option}
        </p>
      )
    })

    return (this.state.quizEnd ?(
      <QuizOver ref={this.storedDataRef} levelNames={this.state.levelNames} score={this.state.score} maxQuestions={this.state.maxQuestions} quizLevel={this.state.quizLevel} percent={this.state.percent} loadLevelQst={this.loadLevelQst}/>
    ) : (
      <Fragment>
      <Levels levelNames={this.state.levelNames} quizLevel={this.state.quizLevel}/>
      <ProgressBar idQuestion={this.state.idQuestion} maxQuestions={this.state.maxQuestions} />

      <h2> {this.state.question}</h2>
      {displayoption}

      <button className='btnSubmit' disabled={this.state.btnDisabled} onClick={this.nextQuestion}>
        {this.state.idQuestion < this.state.maxQuestions -1 ? "suivant" : "terminer"}
      </button>

    </Fragment>
    )
  
     
    )
  }
}

export default Quiz