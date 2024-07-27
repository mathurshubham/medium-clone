import React from 'react'
import { Quote } from '../components/Quote'
import Auth from '../components/Auth'

const Signin = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <Auth type="signin"></Auth>
      </div>
      <div className='hidden md:block'>
        <Quote/>
      </div>
    </div>
  )
}

export default Signin