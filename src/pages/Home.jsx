import React, { Fragment, useEffect, useState } from 'react'
import { CreateProduct } from '../components/CreateProduct'
import { MainProductSlide } from '../components/MainProductSlide'


export default function Home() {


  return (
    <Fragment>
      <CreateProduct/>
      <MainProductSlide/>
    </Fragment>
  )
}
