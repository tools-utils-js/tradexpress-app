async function getPost(slug: string) {
  const res = await fetch(`https://cms.example.com/posts/${slug}`)
  return res.json()
}
 
export default async function Page({ params }: PageProps<'/posts/[slug]'>) {
  const { slug } = await params
  const post = await getPost(slug)
 
  return (
    <main>
      <h1>{post.title}</h1>
      <article>{post.content}</article>
    </main>
  )
}
