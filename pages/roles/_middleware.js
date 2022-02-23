import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { API_URL } from '@/config/index'

export async function middleware (req){      
        const {token} = req.cookies
        if(!token){
            return NextResponse.redirect('/account/login')
        } 

        return
}