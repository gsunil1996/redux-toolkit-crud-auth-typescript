import PersistLogin from '@/components/PersistLogin'
import WeatherApi from '@/components/WeatherApi'
import React from 'react'

const Index = () => {
  return (
    <PersistLogin>
      <WeatherApi />
    </PersistLogin>
  )
}

export default Index