
function BodyItem({item,handleClick}) {
    return <div>
    <img src={item.imgUrl} alt="" className='imageItem' onClick={() => {
      handleClick(item.id)
    }}/>
    <h3 className='text-center fw-bold text-capitalize'>{item.name}</h3>
  </div>
}

export default BodyItem
