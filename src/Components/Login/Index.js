import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import FirebaseContext from '../Firebase/Context'
import { useNavigate  } from 'react-router'



const Login = (props) => {
  const history = useNavigate ()

  const firebase = useContext(FirebaseContext)
  

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const [error, seterror] = useState('')



  //gerer laffichage du btn
  const [btn, setbtn] = useState(false)
  useEffect(() => {
    if(password.length >5 && email !==''){
      setbtn(true)
    }else if(btn === true){
      setbtn(false)
    }
    
  }, [password, email])
  


  const handleSubmit =(e)=>{
    e.preventDefault();

    firebase.loginuser(email, password)
    .then(user=>{
      setemail('');
      setpassword('');
      history('/welcome') // ce sont les props lors de la route dans app.js 
    })
    .catch(error =>{
      seterror(error);
      setemail('');
      setpassword('');

    })

  }


  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeftLogin'>
        </div>
        <div className='formBoxRight'>
          <div className='formContent'>
            {error !== '' && <span>{error.message}</span>}
            <h2>connexion</h2>
            <form onSubmit={handleSubmit}>

              <div className='inputBox'>
                <input onChange={(e)=>{setemail(e.target.value)}} value={email} type="email"  autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>
              <div className='inputBox'>
                <input onChange={(e)=>{setpassword(e.target.value)}} type="password" autoComplete="off" required />
                <label htmlFor="password">Mot de passe</label>
              </div>
            

            {/* //si le button est en true cela veut dire que lles cdt de mot de passe et email son respecter  */}
              {btn ? <button>connexion</button> : <button disabled>connexion</button>}
            </form>
            <div className='linkContainer'>
              
              <Link className='simpleLink' to='/signup'>Nouveau sur Marvel-quiz? inscrivez vous maintenant. </Link>
              <br/>
              
              <Link className='simpleLink' to='/forgetpassword'>Mot de passe oublié? cliquez ici </Link>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Login