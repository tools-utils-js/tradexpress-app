import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
 
  // This secret should only be known to this Route Handler and the CMS
  if (secret !== 'MY_SECRET_TOKEN' || !slug) {
    return new Response('Invalid token', { status: 401 })
  }
 
  // Verify the slug exists in the CMS before enabling Draft Mode
  const post = await getPostBySlug(slug)
  if (!post) {
    return new Response('Invalid slug', { status: 401 })
  }
 
  const draft = await draftMode()
  draft.enable()
 
  // Redirect to the path from the fetched post, not from searchParams,
  // to avoid open redirect vulnerabilities
  redirect(post.slug)
}
