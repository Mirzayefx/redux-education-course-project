import React, { useEffect } from 'react'
import HomeWorkCard from './HomeWorkCard'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeWorkCards, getMyHomeWorkCards } from '../action/MainAction'

const HomeWorkContainer = () => {
    const dispatch = useDispatch()
    const getHomeWorkCardsArr = useSelector(state=>state.Data.getHomeWorkCardsArr)
    const getMyHomeWorkCardsArr = useSelector(state=>state.Data.getMyHomeWorkCardsArr)
    const loggedInUser = useSelector(state=>state.Data.loggedInUser)


    console.log();
    useEffect(()=>{
        dispatch(getHomeWorkCards())
        dispatch(getMyHomeWorkCards())
    },[dispatch])

  return (
    <div className='homerwork_container'>
        {
            loggedInUser.is_staff === true ? 
            getHomeWorkCardsArr.map((data,i)=>{
                return <HomeWorkCard key={i} data={data}/>
            }) :
            getMyHomeWorkCardsArr.map((data,i)=>{
                return <HomeWorkCard key={i} data={data}/>
            }) 
        }
    </div>
  )
}

export default HomeWorkContainer