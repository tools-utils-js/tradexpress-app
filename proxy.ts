import { NextRequest, NextResponse } from 'next/server'
 
export async function proxy(request: NextRequest) {
  // Next.js automatically buffers the body with the configured size limit
  // You can read the body in proxy...
  const body = await request.text()
 
  // If the body exceeded the limit, only partial data will be available
  console.log('Body size:', body.length)
 
  return NextResponse.next()
}
