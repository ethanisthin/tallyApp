'use client'

import { useState, useEffect } from 'react'

interface Trip {
  id: string
  name: string
  description?: string
  createdAt: string
}

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newTrip, setNewTrip] = useState({ name: '', description: '' })

  // Fetch trips from API
  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const response = await fetch('/api/trips')
      const data = await response.json()
      setTrips(data)
    } catch (error) {
      console.error('Error fetching trips:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTrip = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTrip,
          createdBy: 'user1' // Temporary until we add auth
        }),
      })
      
      if (response.ok) {
        setNewTrip({ name: '', description: '' })
        setShowForm(false)
        fetchTrips() // Refresh the list
      }
    } catch (error) {
      console.error('Error creating trip:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading trips...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Trips</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'Cancel' : 'Create New Trip'}
        </button>
      </div>

      {/* Create Trip Form */}
      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Create New Trip</h3>
          <form onSubmit={createTrip} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trip Name
              </label>
              <input
                type="text"
                required
                value={newTrip.name}
                onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Weekend Getaway"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={newTrip.description}
                onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Trip details..."
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Trip
            </button>
          </form>
        </div>
      )}

      {/* Trips List */}
      <div className="space-y-4">
        {trips.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No trips yet. Create your first trip!
          </div>
        ) : (
          trips.map((trip) => (
            <div key={trip.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{trip.name}</h3>
                  {trip.description && (
                    <p className="text-gray-600 mt-1">{trip.description}</p>
                  )}
                  <p className="text-sm text-gray-400 mt-2">
                    Created: {new Date(trip.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Details →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}