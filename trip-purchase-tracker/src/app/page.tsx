import Trips from '@/components/trips'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Trip Purchase Tracker
          </h1>
          <p className="text-gray-600">
            Keep track of who owes what on your trips
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <Trips />
        </div>
      </div>
    </div>
  )
}