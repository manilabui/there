import React, { Fragment, useState, useEffect } from 'react'
import { sortBy, isEmpty, toPairs } from 'lodash'
import { getAll, getItem } from '../../modules/apiManager'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg'
import FestDay from './FestDay'
import './Schedule.css'

const createDaysObj = arr => {
  const result = {}

  arr.forEach(currSet => {
    const currDay = currSet.day
    // add set to the result obj by pushing to existing array or starting new one
    result[currDay] ? result[currDay].push(currSet) : (result[currDay] = [currSet])
  })

  return result
}

export default ({ scheduleId, user }) => {
  const [name, setName] = useState('Festival Name')
  const [location, setLocation] = useState('Location')
  const [festUrl, setFestUrl] = useState(null)
  const [locationUrl, setLocationUrl] = useState(null)
  const [festDays, setFestDays] = useState([])
  const [userDays, setUserDays] = useState({})
  const [showDelete, setDelete] = useState(false)

  const getUserSchedule = () => {
    getAll(`usersToArtistEvents/?userId=${user.id}&_expand=artistsToEvent`).then(events => {
      if (events.length) {
        const userArtistsToEvents = events.map(({ id, artistsToEvent, attendance }) => {
          // userArtistsToEventId needed in the obj for removal of set from db
          // attendance needed to differentiate styling in the user's schedule
          return { userToArtistsEventId: id, attendance, ...artistsToEvent }
        })
        const userDaysObj = createDaysObj(userArtistsToEvents)

        setUserDays(userDaysObj)
      }
    })
  }

  const getSchedules = () => {
    if (scheduleId) {
      getItem('events', `${scheduleId}?_embed=artistsToEvents`).then(
        ({ name, eventUrl, location, locationUrl, artistsToEvents }) => {
          const daysObj = createDaysObj(artistsToEvents)
          const daysArr = sortBy(toPairs(daysObj))

          setFestDays([])
          setName(name)
          setFestUrl(eventUrl)
          setLocation(location)
          setLocationUrl(locationUrl)
          setFestDays(daysArr)
        }
      )

      if (user) getUserSchedule()
    }
  }

  useEffect(getSchedules, [scheduleId])
  // user info is left as an obj in order to access the currDay without looping again
  const festDaysArr = sortBy(festDays).map((lineup, i) => {
    const currDay = lineup[0]
    const userLineup = userDays[currDay] ? userDays[currDay] : null

    return <FestDay key={i} festLineup={lineup[1]} userLineup={userLineup} user={user} />
  })

  const festNameEl = festUrl ? (
    <a
      className="header-fest no-underline underline-hover db pt2 fw7 tc ttu tracked"
      target="_blank"
      rel="noopener noreferrer"
      href={festUrl}
    >
      {name}
    </a>
  ) : (
    <h2 className="header-fest pt2 fw7 tc ttu tracked">{name}</h2>
  )

  const locationEl = locationUrl ? (
    <a
      className="card-location no-underline underline-hover w-60 tc i fw5"
      target="_blank"
      rel="noopener noreferrer"
      href={locationUrl}
    >
      {location}
    </a>
  ) : (
    <h5 className="card-location w-60 tc i fw5">{location}</h5>
  )

  return (
    <Fragment>
      {festNameEl}
      <header className="flex pt3">
        <h4 className="header-schedule w-20 tl ttu underline tracked">Fest Schedule</h4>
        {locationEl}
        <h4 className="header-schedule w-20 tr ttu underline tracked">Your Schedule</h4>
      </header>
      <section className="schedule overflow-scroll">{festDaysArr}</section>
    </Fragment>
  )
}
