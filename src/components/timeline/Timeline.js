import React, { Fragment, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import FestCard from '../fest/FestCard'

export default props => {
  const { isAuthenticated } = useAuth()
  console.log(props.fests)
  const festCardArr = props.fests.map(({ event }) => {
    return <FestCard key={event.id} isNewsList={false} {...event} {...props} />
  })

  return (
    <Fragment>
      {/* <h5 className='fr pointer dim underline'>+ Create New Fest</h5> */}
      {isAuthenticated() ? (
        <div className="subsection-timeline dt">
          <div className="dtc v-mid">{festCardArr}</div>
        </div>
      ) : null}
    </Fragment>
  )
}
