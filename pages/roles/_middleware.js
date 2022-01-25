import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { API_URL } from '../../config/index'

export async function middleware (req){      
        const {token} = req.cookies
        if(!token){
            return NextResponse.redirect('/account/login')
        } /*else{
           const strapiRes = await fetch(`${API_URL}/users/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        
            const user = await strapiRes.json()
            return NextResponse.redirect('/account/redirect')
        }*/

        return

  
}