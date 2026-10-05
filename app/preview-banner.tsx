import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
 
async function exitPreview() {
  'use server'
  const draft = await draftMode()
  draft.disable()
  redirect('/')
}
 
export async function PreviewBanner() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null
 
  return (
    <aside role="status">
      Preview mode is on.{' '}
      <form action={exitPreview}>
        <button type="submit">Exit preview</button>
      </form>
    </aside>
  )
}
