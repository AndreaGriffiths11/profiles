'use client'
import { useState } from 'react'
import ProfileCard from './components/ProfileCard'

export default function Home() {
  const [username, setUsername] = useState('')
  const [searchUsername, setSearchUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchUsername(username)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">GitHub Profile Viewer</h1>
          <p className="text-gray-600">Enter a GitHub username to view their profile and activity</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter GitHub username (e.g., facebook)"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              Search
            </button>
          </div>
        </form>
        {searchUsername && <ProfileCard username={searchUsername} />}
      </div>
    </main>
  )
}