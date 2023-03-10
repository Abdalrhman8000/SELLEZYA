import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getState } from '../context/Context'
import { useFirebase } from '../firebase/useFirebase'
import { ProductBox } from './ProductBox'
import { ProductSekelton } from './ProductSekelton'


export const View = styled.div`
  max-width: 650px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MainProductSlide = () => {
  const {postesData,isLoading} = getState();

  return (
    <Fragment>
       <View>
         {isLoading && <ProductSekelton isLoading={isLoading} count={5} />}
          {postesData?.map((e) => {
            return <ProductBox data={e} key={e.colId}/> 
          })}
       </View>
    </Fragment>
  )
}
