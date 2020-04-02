import React from 'react'
import useAuth from '../../hooks/useAuth'
import Moment from 'react-moment'
import { postItem } from '../../modules/apiManager'
import { ReactComponent as Check } from '../../assets/largeCheckIcon.svg'
import { ReactComponent as Star } from '../../assets/largeStarIcon.svg'
import { ReactComponent as Confirmed } from '../../assets/confirmedMarker.svg'

export default ({
  id,
  start,
  name,
  location,
  updateType,
  getAllFests,
  handleFestClick,
  isNewsList,
  user,
}) => {
  const { isAuthenticated } = useAuth()

  if (name.includes('Music Festival')) name = name.split(' Music Festival')[0]
  if (location.includes('USA')) location = location.split(', USA')[0]

  const addToTimeline = attendance => {
    if (isAuthenticated()) {
      const item = {
        userId: user.id,
        eventId: id,
        attendance,
      }

      postItem('usersToEvents', item).then(getAllFests())
    } else {
      window.alert('Sign in to add events to your timeline.')
    }
  }

  const addToTimelineButtons = (
    <div className="icons dib">
      <Check className="dib pointer dim" onClick={() => addToTimeline('confirmed')} />
      <Star className="dib pointer dim ph1" onClick={() => addToTimeline('interested')} />
    </div>
  )

  const locationElStyle = isNewsList
    ? 'card-location-list i fw5 pb1'
    : 'card-location-timeline i fw5'

  return (
    <article className={!isNewsList ? 'pv2' : null}>
      <div>
        {isNewsList ? addToTimelineButtons : null}
        <Moment className="card-date dib ph1 fw6 ttu tracked" format="MM.DD.YY" date={start} />
        {!isNewsList ? <Confirmed className="icons ph1" /> : null}
        <div className="dib pointer dim" onClick={() => handleFestClick(id)}>
          <h6 className="cream f7 fw4 pl1">
            <span className="fw7 ttu tracked">{name}</span>
            <span className="f6 fw4 ph1">|</span>
            {updateType}
          </h6>
        </div>
      </div>
      <h6 className={locationElStyle}>{location}</h6>
    </article>
  )
}
