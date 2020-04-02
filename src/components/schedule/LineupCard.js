import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { ReactComponent as Check } from '../../assets/checkIcon.svg'
import { ReactComponent as Star } from '../../assets/starIcon.svg'
import { ReactComponent as CloseIcon } from '../../assets/closeIcon.svg'
import { getItem, postItem, patchItem, deleteItem } from '../../modules/apiManager'

export default ({ set, user, isPublic, handleUserToArtistEventUpdate }) => {
  const [artist, setArtist] = useState('')
  const [stage, setStage] = useState('')
  const { isAuthenticated } = useAuth()

  const getSet = () => {
    getItem('artistsToEvents', `${set.id}?&_expand=artist&_expand=stage`).then(
      ({ artist, stage }) => {
        setArtist(artist.name)
        setStage(stage.name)
      }
    )
  }

  useEffect(getSet, [])

  const addToUserSchedule = attendance => {
    if (isAuthenticated()) {
      const item = {
        userId: user.id,
        artistsToEventId: set.id,
        attendance,
      }

      postItem('usersToArtistEvents', item).then(currSet => {
        // format set like festSet objects
        set.userToArtistsEventId = currSet.id
        set.attendance = attendance
        handleUserToArtistEventUpdate(set, 'post')
      })
    } else {
      window.alert('Sign in to add sets to your fest schedule.')
    }
  }

  const editUserScheduleItem = attendance => {
    const item = {
      id: set.userToArtistsEventId,
      attendance,
    }

    patchItem('usersToArtistEvents', item).then(currSet => {
      set.attendance = currSet.attendance
      handleUserToArtistEventUpdate(set, 'patch')
    })
  }

  const removeFromUserSchedule = () => {
    deleteItem('usersToArtistEvents', set.userToArtistsEventId)
      .then(() => {
        // format set like festSet objects
        delete set.userToArtistsEventId
        handleUserToArtistEventUpdate(set, 'delete')
      })
  }

  const festSideButtons = (
    <div className="icon-lineup dtc w-10">
      <Check className="pointer dim" onClick={() => addToUserSchedule('confirmed')} />
      <Star className="icon-bottom pointer dim" onClick={() => addToUserSchedule('interested')} />
    </div>
  )

  const userSideButtons = (
    <div className="icon-lineup dtc w-10">
      {set.attendance === 'interested' ? (
        <Check className="pointer dim pl2" onClick={() => editUserScheduleItem('confirmed')} />
      ) : (
        <Star className="pointer dim pl2" onClick={() => editUserScheduleItem('interested')} />
      )}
      <CloseIcon className="icon-bottom pointer dim" onClick={removeFromUserSchedule} />
    </div>
  )

  const artistStyling =
    !isPublic && set.attendance === 'interested' ? 'artist i fw5 pb1' : 'artist fw6 pb1'

  return (
    <article className="dt pt1">
      {isPublic ? festSideButtons : null}
      <div className="dtc dib pl1 pb2">
        <h6 className={artistStyling}>{artist}</h6>
        <h6 className="cream fw4 i ttu">{stage}</h6>
      </div>
      {!isPublic ? userSideButtons : null}
    </article>
  )
}
