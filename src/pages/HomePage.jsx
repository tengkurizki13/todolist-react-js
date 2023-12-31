import React, { useEffect,useState } from "react"
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { fetchDayHandler,fetchDaysHandler,addSchedulHandler } from "../store/actions/actionCreator"

function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [modal,setModal] = useState(false)
  const [isSeleted,setIsSeleted] = useState(false)
  const [isDisabled,setIsDisabled] = useState(true)
  const [isDay,setIsDay] = useState("Select...")
  const [isDaySubmit,setIsDaySubmit] = useState("")
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const [form, setForm] = useState({
    matkul: "",
  })

  const options = [
    { value: 'monday', label: 'Senin' },
    { value: 'tuesday', label: 'Selasa' },
    { value: 'wednesday', label: 'Rabu' },
    { value: 'thursday', label: 'Kamis' },
    { value: 'friday', label: "Jum'at" },
  ];
  const {days,dataMonday,dataTuesday,dataWednesday,dataThursday,dataFriday} = useSelector((state) => state.day)
  const email = localStorage.getItem('email');


  useEffect(() => {
    console.log("masuk");
    dispatch(fetchDaysHandler(email))
    dispatch(fetchDayHandler(email,"monday"))
    dispatch(fetchDayHandler(email,"tuesday"))
    dispatch(fetchDayHandler(email,"wednesday"))
    dispatch(fetchDayHandler(email,"thursday"))
    dispatch(fetchDayHandler(email,"friday"))
},[])

const handleClickOut = () => {
  localStorage.clear();
  navigate("/")
};

// =============
const handleChange = (selectedOption) => {
  setSelectedOption(selectedOption);
};

const handleInputChange = (inputValue) => {
  setInputValue(inputValue);
};
// ============

useEffect(() => {

  console.log(selectedOption == null || form.matkul === "" );
  if (selectedOption == null || form.matkul === "" ) {
    setIsDisabled(true);
  } else {
    setIsDisabled(false);
  }
}, [selectedOption,form.matkul]);

const handleClickOpenModal = () => {
  setSelectedOption(null)
  setModal(true)
};

const handleClickCloseModal = () => {
  setModal(false)
  setIsDay("Select...")
  setIsDaySubmit("")
};

const handleClickDetail = (day) => {
  navigate(`/schedule/${day}`)
};

const handleClickSelect = () => {
    setIsSeleted(!isSeleted)
};
const handleClickSelectDay = (day) => {
  console.log(day,"seeleer");
  switch (day) {
    case "monday":
        setIsDay("Senin")
        setIsDaySubmit(day)
        setIsSeleted(false)
      break;
    case "tuesday":
      setIsDay("Selasa")
      setIsDaySubmit(day)
      setIsSeleted(false)
    break;
    case "wednesday":
      setIsDay("Rabu")
      setIsDaySubmit(day)
      setIsSeleted(false)
    break;
    case "thursday":
      setIsDay("Kamis")
      setIsDaySubmit(day)
      setIsSeleted(false)
    break;
    case "friday":
      setIsDay("Jum'at")
      setIsDaySubmit(day)
      setIsSeleted(false)
    break;
  
    default:
      break;
  }
};

function handleChangeMatkul(e){
  setForm({
    ...form,
    [e.target.name] : e.target.value
  })
}

function handleSubmit(e){
  e.preventDefault()

  dispatch(addSchedulHandler(email,form.matkul,selectedOption.value))
  .then(() => {
    dispatch(fetchDaysHandler(email))
    dispatch(fetchDayHandler(email,"monday"))
    dispatch(fetchDayHandler(email,"tuesday"))
    dispatch(fetchDayHandler(email,"wednesday"))
    dispatch(fetchDayHandler(email,"thursday"))
    dispatch(fetchDayHandler(email,"friday"))
    setModal(false)
  })

}


  const divStyle = {
    position: 'fixed',   
    zIndex: 9999,        
    inset: '16px',       
    pointerEvents: 'none'
  };
  const divNavStyle = {
    fontSize: '2rem',
  };

  const inputStyle = {
    color: 'inherit',
    background: '0px center',
    opacity: 1,
    width: '100%',
    gridArea: '1 / 2 / auto / auto',
    font: 'inherit',
    minWidth: '2px',
    border: '0px',
    margin: '0px',
    outline: '0px',
    padding: '0px'
  };
  
  return (
    <>
     <header className="header__OVZyn">
        <div className="header_container__EVhPL center__EXlFe">
          <h1 data-cy="header-title" style={divNavStyle}>GetJadwal</h1>
          <div className="spacer__qkkG9"></div>
          <button className="btn__tq85o" data-cy="btn-logout" onClick={handleClickOut}>Check out | {email}</button>
        </div>
      </header>

      {/* ================= */}

    <div className="container__CCxiH">
      <div className="hstack__fPl8y">
        <div className="spacer__qkkG9"></div>
        <button className="btn__tq85o" data-cy="btn-create-schedule" onClick={handleClickOpenModal}>+ Buat Jadwal Kuliah</button>
      </div>
        <div className="hstack__fPl8y">
          <a className="day__0MayP" >
            <div>
              <div className="card__bOBV7" data-cy="card-day" >
                <h3 data-cy="card-title-Senin" onClick={() => {
                handleClickDetail("monday")
              }}>Senin </h3>
                    {days.monday > 0 ? (
                        <p data-cy="card-desc-Senin" className="not_empty__kDILV"> {days.monday} Mata Kuliah</p>
                      ) : (
                        <p data-cy="card-desc-Senin" className="">Belum ada mata kuliah</p>
                      )}
              </div>
              <br/>
              {dataMonday.length > 0 ? (
                    <div className="card__bOBV7">
                    {dataMonday.map((el,i) =>{
                      return <div key={i} data-cy={"Senin-" + el.title} className="day_item__HtSX1">{el.title}</div>
                      
                      })}
                  </div>
                  ) : (
                   <div></div>
                  )}
            </div>
          </a>
          <a className="day__0MayP" >
            <div>
              <div className="card__bOBV7" data-cy="card-day" >
                <h3 data-cy="card-title-Selasa" onClick={() => {
                handleClickDetail("tuesday")
              }}>Selasa </h3>
                {days.tuesday > 0 ? (
                        <p data-cy="card-desc-Selasa" className="not_empty__kDILV"> {days.tuesday} Mata Kuliah</p>
                      ) : (
                        <p data-cy="card-desc-Selasa" className="">Belum ada mata kuliah</p>
                      )}
              </div>
              <br/>
              {dataTuesday.length > 0 ? (
                    <div className="card__bOBV7">
                    {dataTuesday.map((el,i) =>{
                      return <div key={i} data-cy={"Selasa-" + el.title} className="day_item__HtSX1">{el.title}</div>
                      
                      })}
                  </div>
                  ) : (
                   <div></div>
                  )}
            </div>
          </a>
          <a className="day__0MayP" >
            <div>
              <div className="card__bOBV7" data-cy="card-day" >
                <h3 data-cy="card-title-Rabu" onClick={() => {
                handleClickDetail("wednesday")
              }}>Rabu </h3>
                {days.wednesday > 0 ? (
                        <p data-cy="card-desc-Rabu" className="not_empty__kDILV"> {days.wednesday} Mata Kuliah</p>
                      ) : (
                        <p data-cy="card-desc-Rabu" className="">Belum ada mata kuliah</p>
                      )}
              </div>
                <br/>
                {dataWednesday.length > 0 ? (
                    <div className="card__bOBV7">
                    {dataWednesday.map((el,i) =>{
                      return <div key={i} data-cy={"Rabu-" + el.title} className="day_item__HtSX1">{el.title}</div>
                      
                      })}
                  </div>
                  ) : (
                   <div></div>
                  )}
            </div>
            </a>
            <a className="day__0MayP" >
              <div>
                <div className="card__bOBV7" data-cy="card-day" >
                  <h3 data-cy="card-title-Kamis" onClick={() => {
                  handleClickDetail("thursday")
                }}>Kamis </h3>
                  {days.thursday > 0 ? (
                        <p data-cy="card-desc-Kamis" className="not_empty__kDILV"> {days.thursday} Mata Kuliah</p>
                      ) : (
                        <p data-cy="card-desc-Kamis" className="">Belum ada mata kuliah</p>
                      )}
                </div>
                <br/>
                {dataThursday.length > 0 ? (
                    <div className="card__bOBV7">
                    {dataThursday.map((el,i) =>{
                      return <div key={i} data-cy={"Kamis-" + el.title} className="day_item__HtSX1">{el.title}</div>
                      
                      })}
                  </div>
                  ) : (
                   <div></div>
                  )}
              </div>
            </a>
            <a className="day__0MayP" >
              <div>
                <div className="card__bOBV7" data-cy="card-day" >
                  <h3 data-cy="card-title-Jumat" onClick={() => {
                  handleClickDetail("friday")
                }}>Jumat </h3>
                  {days.friday > 0 ? (
                        <p data-cy="card-desc-Jumat" className="not_empty__kDILV"> {days.friday} Mata Kuliah</p>
                      ) : (
                        <p data-cy="card-desc-Jumat" className="">Belum ada mata kuliah</p>
                      )}
                </div>
                  <br/>
                  {dataFriday.length > 0 ? (
                    <div className="card__bOBV7">
                    {dataFriday.map((el,i) =>{
                      return <div key={i} data-cy={"Jumat-" + el.title} className="day_item__HtSX1">{el.title}</div>
                      
                      })}
                  </div>
                  ) : (
                   <div></div>
                  )}
              </div>
            </a>
          </div>
        </div>

        {/* ==================================================================== */}

        {modal ?  
              <div className="modal__cKUQp">
                <div className="modal_content__q09Sf">
                  <span data-cy="close-modal" className="close__fK+KL" onClick={handleClickCloseModal}>×</span>
                  <div>
                    <form data-cy="form-add" onSubmit={(e) => handleSubmit(e)}>
                      <h2 className="title p20">Buat Jadwal Kuliah</h2>
                      <div className="p20 gapFlex">
                        <div className="input__HyxCB fullWidth__SF77u">
                          <label>Mata Kuliah</label>
                          <input placeholder="Masukkan mata kuliah" type="text" className="fullWidth__SF77u" name="matkul"  data-cy="form-matkul"  onChange={(e) => { handleChangeMatkul(e)}}/>
                        </div>
                        <div className="input__uzWsy fullWidth__Itihh">
                          <label for="form-day">Pilih Hari</label>
                          <div className=" css-b62m3t-container" id="form-day" data-cy="form-day">
                            <span id="react-select-4-live-region" className="css-7pg0cj-a11yText"></span>
                            <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" className="css-7pg0cj-a11yText"></span>

                              <Select
                                  value={selectedOption}
                                  options={options}
                                  onChange={(e) => { handleChange(e)}}
                                  onInputChange={handleInputChange}
                                  inputValue={inputValue}
                                  isSearchable={true}
                                />
{/* 
                          {isSeleted ? 
                          <div className="days mt-2">
                            <div className=" css-1s2u09g-control">
                              <div className=" css-1d8n9bt">
                                <div className=" css-14el2xx-items" id="react-select-4-placeholder fw-bold" onClick={() => {handleClickSelectDay("monday")}}>Senin</div>
                                <input className="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-4-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="false"  aria-haspopup="true" role="combobox" aria-describedby="react-select-4-placeholder" style={inputStyle} />
                                <div className=" css-ackcql" data-value="">
                                </div>
                              </div>
                            </div>

                            <div className=" css-1s2u09g-control">
                              <div className=" css-1d8n9bt">
                                <div className=" css-14el2xx-items" id="react-select-4-placeholder fw-bold" onClick={() => {handleClickSelectDay("tuesday")}}>Selasa</div>
                                   <input className="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-4-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="false"  aria-haspopup="true" role="combobox" aria-describedby="react-select-4-placeholder" style={inputStyle} />
                                <div className=" css-ackcql" data-value="">
                                </div>
                              </div>
                            </div>

                            <div className=" css-1s2u09g-control">
                              <div className=" css-1d8n9bt">
                                <div className=" css-14el2xx-items" id="react-select-4-placeholder fw-bold" onClick={() => {handleClickSelectDay("wednesday")}}>Rabu</div>
                                   <input className="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-4-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="false"  aria-haspopup="true" role="combobox" aria-describedby="react-select-4-placeholder" style={inputStyle} />
                                <div className=" css-ackcql" data-value="">
                                </div>
                              </div>
                            </div>

                            <div className=" css-1s2u09g-control">
                              <div className=" css-1d8n9bt">
                                <div className=" css-14el2xx-items" id="react-select-4-placeholder fw-bold" onClick={() => {handleClickSelectDay("thursday")}}>Kamis</div>
                                   <input className="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-4-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="false"  aria-haspopup="true" role="combobox" aria-describedby="react-select-4-placeholder" style={inputStyle} />
                                <div className=" css-ackcql" data-value="">
                                </div>
                              </div>
                            </div>

                            <div className=" css-1s2u09g-control">
                              <div className=" css-1d8n9bt">
                                <div className=" css-14el2xx-items" id="react-select-4-placeholder fw-bold" onClick={() => {handleClickSelectDay("friday")}}>Jum'at</div>
                                   <input className="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-4-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="false"  aria-haspopup="true" role="combobox" aria-describedby="react-select-4-placeholder" style={inputStyle} />
                                <div className=" css-ackcql" data-value="">
                                </div>
                              </div>
                            </div>

                            </div> 
                             : <div></div>} */}


                            <input name="form-day" type="hidden" value=""/>
                          </div>
                        </div>
                      </div>
                      <div className="actionContainer p20">
                        <button className="btn__tq85o" disabled={isDisabled} type="submit" data-cy="btn-submit" >Simpan</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              : <div></div>}
              
        <div style={divStyle}></div>
    </>
  )
}
export default HomePage
