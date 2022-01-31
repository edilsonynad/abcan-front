import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/config/index";

export async function middleware(req) {
  const { token } = req.cookies;
  const strapiRes = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await strapiRes.json();

  let count = req.page.name.length;
  const page = req.page.name;
  const papel = user.papel.toLowerCase();
  let res = page.search(papel);


    if( res == -1){
        return NextResponse.redirect(`/roles/${papel}`)
    }else{
        return NextResponse.next()
    }
}
