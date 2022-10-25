import React from "react";
import { TailSpin } from 'react-loader-spinner'

function Load(){
  return(
    <div className='load'>
      <TailSpin color='#202124' wrapperClass='load'/>
      <p>Loading...</p>
    </div>
  )
}

export default Load;