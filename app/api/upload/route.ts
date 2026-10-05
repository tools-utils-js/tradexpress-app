import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest) {
  // ...and the body is still available in your route handler
  const body = await request.text()
 
  console.log('Body in route handler:', body.length)
 
  return NextResponse.json({ received: body.length })
}
