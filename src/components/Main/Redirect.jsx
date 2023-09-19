import { Spinner } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { baseURL } from '../..'
import NavContext from '../NavContext'

const Redirect = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const sso = queryParams.get("sso")
    const sig = queryParams.get("sig")

    const { auth } = useContext(NavContext)


    useEffect(() => {
        if (sso && sig) {
            redirect()
        }
    }, [])

    const redirect = async () => {
        try {
            const data = await fetch(baseURL + `community/sso?sso=${sso}&sig=${sig}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": auth
                }
            })
            const res = await data.json()
            window.location.href = res?.data
            console.log(res)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='h-full w-full flex justify-center items center mt-[40vh] '>
            <Spinner size="xl" />
        </div>
    )
}

export default Redirect