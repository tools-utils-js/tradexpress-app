export default async function ItemPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Item Detail View</h1>
      <p className="mt-2 text-gray-600">Current Item ID: {id}</p>
    </main>
  )
}
