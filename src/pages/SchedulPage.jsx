import bottonImage from '../assets/todo-back-button.png';
import emptyImage from '../assets/todo-empty-state.png';
import editImage from '../assets/card-item-edit.png';
import deleteImage from '../assets/card-item-delete.png';
import deleteimg from '../assets/delete.png';
import { useDispatch, useSelector } from "react-redux"
import { fetchOneDayHandler,addSchedulHandler,deleteSchedulHandler,updateSchedulHandler } from "../store/actions/actionCreator"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect,useState } from "react"


function SchedulPage() {
  let { day } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const {oneDay} = useSelector((state) => state.day)
  const [modal,setModal] = useState(false)
  const [modlet,setModlet] = useState(false)
  const [modif,setModif] = useState(false)
  const [isEdit,setIsEdit] = useState(true)
  const [idItem,setIdItem] = useState(0)
  const [isDisabled,setIsDisabled] = useState(true)
  const [form, setForm] = useState({
    matkul: "",
    })



  useEffect(() => {
    dispatch(fetchOneDayHandler(email,day))
},[oneDay])


const handleClickHome = () => {
  navigate("/home")
};

const handleClickModal = () => {
  setIsEdit(false)
  setForm({matkul: ""})
  setModal(!modal)
};

const handleClickCloseModlet = () => {
  setModlet(!modlet)
};

const handleClickOpenModlet = (id) => {
  setIdItem(id)
  setModlet(!modlet)
};

const handleClickOpenModit = (id,title) => {
  setIsEdit(true)
  setIdItem(id)
  setForm({matkul: title})
  setModal(!modal)
};

const handleSubmitDeleted = (e) => {
  e.preventDefault()
  console.log("masuk");
  dispatch(deleteSchedulHandler(email,idItem))
  .then(() => {
    dispatch(fetchOneDayHandler(email,day))
    setModlet(!modlet)
    setModif(true)
    setTimeout(() => {
    setModif(false)
    }, 2000);
  })
};

const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
}

useEffect(() => {
  if (form.matkul !== "") {
    setIsDisabled(false);
  } else {
    setIsDisabled(true);
  }
}, [form.matkul]);

function handleSubmit(e){
  e.preventDefault()
  

  if (isEdit) {
    dispatch(updateSchedulHandler(email,idItem,form.matkul))
    .then(() => {
      dispatch(fetchOneDayHandler(email,day))
      setModal(!modal)
    })
  }else{
    dispatch(addSchedulHandler(email,form.matkul,day))
    .then(() => {
      dispatch(fetchOneDayHandler(email,day))
      setModal(!modal)
    })
  }
 

}

const translations = {
  "monday": "Senin",
  "tuesday": "Selasa",
  "wednesday": "Rabu",
  "thursday": "Kamis",
  "friday": "Jum'at",
};

// Menerjemahkan kata
const translatedDay = translations[day]; 

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
          <button className="btn__tq85o" data-cy="btn-logout">Check out | rizki@gmail.com</button>
        </div>
      </header>

      {/* ================= */}

      <div className="container__CCxiH">
        <div className="hstack__fPl8y heading__dCCoo">
          <a  data-cy="btn-back" className="title__iw5gV" onClick={handleClickHome}><img src={bottonImage} width={30} /></a>
          <h2 className="title__iw5gV" data-cy="detail-title">{translatedDay}</h2>
          <div className="spacer__qkkG9"></div>
            <button className="btn__tq85o" data-cy="btn-create-schedule" onClick={handleClickModal}>+ Tambah Mata Kuliah</button>
        </div>

        <div className="hstack__tyo+H">
        {oneDay.length > 0 ? (
                    <div className="card__bOBV7">
                    {oneDay.map((el,i) =>{
                      return  <div key={el.id} className="card__bOBV7 mt-3" data-cy="card-item">
                                <div className="hstack__fPl8y mid__vGfDt">
                                  <h3 data-cy="card-item-title">{el.title}</h3>
                                  <div className="spacer__qkkG9"></div>
                                  <div className="hstack__fPl8y">
                                    <img src={editImage} data-cy="card-item-edit" onClick={() => { handleClickOpenModit(el.id,el.title)}}/>
                                    <img src={deleteImage} data-cy="card-item-delete" onClick={() => { handleClickOpenModlet(el.id)}} />
                                  </div>
                                </div>
                              </div>
                      })}
                  </div>
                  ) : (
                    <div className="empty__fGgKD">
                    <img src={emptyImage} width={800} height={600} alt="No Schedule" data-cy="todo-empty-state"/>
                  </div>
                  )}
        </div>

      </div>


        {/* ==================================================================== modal add & edit */}

        {modal ? 
        <div className="modal__cKUQp">
          <div className="modal_content__q09Sf">
            <span data-cy="close-modal" className="close__fK+KL" onClick={handleClickModal}>×</span>
            <div>
              <form data-cy="detail-form" onSubmit={(e) => handleSubmit(e)}>
                <h2 className="title p20" data-cy="form-title">Buat Jadwal Kuliah</h2>
                <div className="p20 gapFlex">
                  <div className="input__HyxCB fullWidth__SF77u">
                    <label>Mata Kuliah</label>
                    <input placeholder="Masukkan mata kuliah" className="fullWidth__SF77u" value={form.matkul} data-cy="form-matkul" name="matkul" onChange={(e) => {
        handleChange(e)
      }}/>
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
        {/* ==================== */}


        {/* ==============================modal hapus ================== */}

        {modlet ? 

        <div className="modal__cKUQp">
          <div className="modal_content__q09Sf small__gklYl">
            <span data-cy="close-modal" className="close__fK+KL" onClick={handleClickCloseModlet}>×</span>
            <div>
              <form data-cy="form-delete" className="container__CurNQ" onSubmit={(e) => handleSubmitDeleted(e)}>
                <div className="img__mRlIp">
                  <img src={deleteimg} alt="delete-icon"/>
                  </div>
                <h2>Hapus Mata Kuliah</h2>
                <p className="modal-text">Apakah anda yakin menghapus mata kuliah ad?</p>
                <div className="action__3kGZg">
                  <button className="btn__tq85o gray__eEGKP" type="button" data-cy="btn-close" onClick={handleClickCloseModlet}>Batal</button>
                  <button className="btn__tq85o danger__N5jkG" data-cy="btn-submit" type="submit" >Hapus</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        : <div></div>}


        {/* ================modal-informasion============ */}

          {modif ?
        <div className="modal-informansi"  data-cy="modal-information" >
          <p><i class="bi bi-check-lg"></i> Mata Kuliah Berhasil diHapus</p>
        </div>
        : <div></div>} 
        <div style={divStyle}></div>
    </>
  )
}

export default SchedulPage
