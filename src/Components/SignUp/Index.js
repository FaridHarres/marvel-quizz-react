import React, { useState, useContext } from 'react'
import FirebaseContext from '../Firebase/Context'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'




const Signup = (props) => {

  const history = useNavigate()



  const firebase = useContext(FirebaseContext)
  // console.log(firebase)

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [loginData, setloginData] = useState(data);
  const [error, seterror] = useState('')

  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.id]: e.target.value });
  }
  // const firebase = new Firebase();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    //jappel mon objet firebase (context)
    firebase.signupuser(email, password)
    .then((authUser)=>{
      return firebase.user(authUser.user.uid).set({
        pseudo,
       email
      })

    })
      .then(() => {
        setloginData({ ...data })//vider la variable d'etat
        history('/welcome') // ce sont les props lors de la route dans app.js 
      }).catch(error => {
        seterror(error)
        setloginData({ ...data })//vider la variable d'etat
      })

  }

  //faire le destructuring pour acceder au data 
  const { pseudo, email, password, confirmPassword } = loginData;

  const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword ? <button disabled>Inscription</button> : <button>inscription</button>


  //gestion des erreurs
  const errorMsg = error !== '' && <span>{error.message}</span>
  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>

        <div className='formBoxLeftSignup'>
        </div>
        <div className='formBoxRight'>
          <div className='formContent'>
            {errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>

              <div className='inputBox'>
                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" required />
                <label htmlFor="pseudo">Pseudo</label>

              </div>
              <div className='inputBox'>
                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>
              <div className='inputBox'>
                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className='inputBox'>
                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                <label htmlFor="confirmPassword">Confirmer votre Mot de passe</label>
              </div>

              {btn}
            </form>
            <div className='linkContainer'>
              <Link className='simpleLink' to='/login'>Deja inscrit? connectez-vous </Link>

            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Signup