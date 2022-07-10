import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import FirebaseContext from '../Firebase/Context'
import { useNavigate  } from 'react-router'


const ForgetPassword = () => {
  const history = useNavigate ()


  const firebase = useContext(FirebaseContext)

  const [email, setemail] = useState('')


  //si le mdp existe dans la data base = ok 
  const [success, setsuccess] = useState(null)
  const [error, seterror] = useState(null)

  const handleSubmit =(e)=>{
    e.preventDefault();
    firebase.passwordReset(email)
    .then(()=>{
      seterror(null)
      setsuccess(`Un mail vous a ete envoyé afin de reinitialiser votre mot de passe ${email}`)
      setemail("")
        setTimeout(()=>{
          history('/login')
        },5000)

    }).catch((error)=>{
      seterror(error);
      setemail("")
    })
  }

  const disabled = email ==="";


  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeftForget'>
        </div>
        <div className='formBoxRight'>
          <div className='formContent'>

            {/* //si et seulement si success = true */}
            {success &&  <span style={{border: '1px solide green', background:'green', color:'#ffffff'}}>{success}</span>}

            {error && <span>{error.message}</span>}

            <h2>Mot de passe oublié?</h2>
            <form onSubmit={handleSubmit}>

              <div className='inputBox'>
                <input onChange={(e)=>setemail(e.target.value)} value={email} type="email"  autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>
           
              <button disabled={disabled} >Recuperer</button>
            </form>
            <div className='linkContainer'>
              <Link className='simpleLink' to='/login'>Deja inscrit? connectez vous</Link>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ForgetPassword