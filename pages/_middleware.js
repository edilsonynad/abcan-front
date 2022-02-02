import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware (req){      
        const page = req.page.name
        if(page == '/'){
            return NextResponse.redirect('/account/login')
        } 

        return
}