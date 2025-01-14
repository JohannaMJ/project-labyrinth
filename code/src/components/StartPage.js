import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchGame, game } from '../reducers/game'
import { useNavigate } from 'react-router-dom'
import { StartButton } from './StartButton'
import styled from 'styled-components/macro'

import '../title.css'

const StyledStartPage = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  background-color: #111;
  background-image: radial-gradient(#333, #111);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  text-align: center;
  color: #fff;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 150px;

  & input {
    font-size: 1.3rem;
    padding: 1rem 2.5rem;
    border-radius: 0.75rem;
    border: 1px solid #ccc;
    font-family: Creepster;
  }
`

const StartPage = ({ startMusic }) => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const onNameSubmit = (name) => {
    dispatch(game.actions.setUserName(name))
    navigate('/MainGame')
    startMusic()
    setName('')
  }

  const onSetName = (event) => {
    setName(event.target.value)
  }

  const onEnter = (event) => {
    if (event.key === 'Enter') {
      onNameSubmit(name)
      dispatch(fetchGame(name))
    }
  }

  return (
    <StyledStartPage>
      <div id='fly-in'>
        <div>
          <span>Do you</span>really dare
        </div>
        <div>
          <span>to enter</span> the maze?
        </div>
        <div>
          <span>Can you choose</span> the right <span>direction?</span>
        </div>
        <div>
          <span>Or will you</span> forever
        </div>
        <div>
          <span>be</span>Lost...
        </div>
      </div>

      <InputWrapper>
        <input
          type='text'
          value={name}
          placeholder='Your name, if you dare...'
          onChange={onSetName}
          onKeyDown={(event) => {
            onEnter(event)
          }}
        />

        <StartButton
          disabled={name.length === 0}
          className='start-button'
          onClick={() => {
            onNameSubmit(name)
            dispatch(fetchGame(name))
          }}
        >
          Start
          <img
            src='https://img.icons8.com/ios/50/000000/bat--v2.png'
            alt='a bat'
          />
        </StartButton>
      </InputWrapper>
    </StyledStartPage>
  )
}

export default StartPage
