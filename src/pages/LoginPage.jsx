import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginHandler,fetchDaysHandler,fetchDayHandler } from '../store/actions/actionCreator'


function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

// state ==========
const [message,setMessage] = useState("")
const [isDisabled,setIsDisabled] = useState(true)
const [form, setForm] = useState({
    email: "",
  })

  // =============

  // method =====


  function handleChange(e){
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

 

  useEffect(() => {
    console.log("suss");
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if(!isValid){
      setIsDisabled(true)
      setMessage("Format email tidak sesuai")
    }else{
      setIsDisabled(false)
      setMessage("")
    }
  }, [form.email]);
  
  useEffect(() => {
      setIsDisabled(true)
      setMessage("")
  }, []);


  // ==========
  const divStyle = {
    position: 'fixed',   
    zIndex: 9999,        
    inset: '16px',       
    pointerEvents: 'none'
  };

  const buttonStyle = {
    width: '100%'
  };

  const divNavStyle = {
    fontSize: '2rem',
  };

  function handleSubmit(e){
    e.preventDefault()
    
    dispatch(loginHandler(form.email))
    .then(() => {
      dispatch(fetchDaysHandler(form.email))
      dispatch(fetchDayHandler(form.email,"monday"))
      dispatch(fetchDayHandler(form.email,"tuesday"))
      dispatch(fetchDayHandler(form.email,"wednesday"))
      dispatch(fetchDayHandler(form.email,"thursday"))
      dispatch(fetchDayHandler(form.email,"friday"))
      navigate("/home")
    })
  
  }

  // =============
  
  return (
    <>
      <header className="header__OVZyn">
        <div className="header_container__EVhPL center__EXlFe">
          <h1 data-cy="header-title" style={divNavStyle}>GetJadwal</h1>
          </div>
      </header>
      <div className="container__90B9A">
        <form className="card__aclyu" onSubmit={(e) => handleSubmit(e)}>
          <h1 data-cy="text-login">Check In</h1>
          <div className="input__HyxCB fullWidth__SF77u">
            <label for="email">Email</label>
            <input id="email" placeholder="Masukkan email anda" className="fullWidth__SF77u" type="email" data-cy="input-email" name="email" value={form.email} onChange={(e) => {
        handleChange(e)
      }}/>
          {message !== "" ?
          <span data-cy="error-email" className="error_text__wNXR+">{message}</span> : ""}
              </div>
              <button className="btn__tq85o" disabled={isDisabled} data-cy="btn-login" style={buttonStyle}>Mulai Sesi</button>
        </form>
      </div>
      <div style={divStyle}></div>
    </>
  )
}

export default LoginPage
