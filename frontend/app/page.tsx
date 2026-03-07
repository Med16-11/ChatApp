import { redirect, RedirectType } from 'next/navigation'
import React from 'react'

const page = () =>{
  return redirect("/chat");
}

export default page