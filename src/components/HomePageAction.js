import React from 'react';
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function HomePageAction(){
  return(
    <div className='homepage__action'>
      <Link to='notes/new'>
        <button className='action' type='button' title='Tambah'><FiPlus /></button>
      </Link>
    </div>
  )
}

export default HomePageAction;