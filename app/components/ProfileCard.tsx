'use client'
import React from 'react'
import { useState, useEffect } from 'react'

interface GitHubUser {
 login: string
 name: string
 avatar_url: string
 bio: string
 public_repos: number
 followers: number
 following: number
 html_url: string
 company: string
 location: string
 blog: string
 twitter_username: string
 email: string
 created_at: string
 updated_at: string
 hireable: boolean
}

interface GitHubActivity {
 id: string
 type: string
 repo: {
   name: string
   url: string
 }
 created_at: string
 payload?: {
   description?: string
   ref_type?: string
   ref?: string
   push_id?: number
   commits?: Array<{
     message: string
   }>
 }
}

export default function ProfileCard({ username }: { username: string }) {
 const [user, setUser] = useState<GitHubUser | null>(null)
 const [activities, setActivities] = useState<GitHubActivity[]>([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState('')

 useEffect(() => {
   const fetchData = async () => {
     try {
       setLoading(true)
       setError('')

       const userRes = await fetch(`/api/github/user/${username}`)
       if (!userRes.ok) throw new Error('User not found')
       const userData = await userRes.json()

       const activitiesRes = await fetch(`/api/github/activities/${username}`)
       const activitiesData = await activitiesRes.json()

       setUser(userData)
       setActivities(activitiesData)
     } catch (err) {
       setError(err instanceof Error ? err.message : 'An error occurred')
     } finally {
       setLoading(false)
     }
   }

   fetchData()
 }, [username])

 if (loading) return (
   <div className="flex justify-center items-center min-h-[400px]">
     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
   </div>
 )
 
 if (error) return (
   <div className="max-w-2xl mx-auto mt-4 p-4 bg-white border border-red-200 rounded-lg">
     <div className="flex items-center gap-3 text-red-600">
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
       </svg>
       <span>{error}</span>
     </div>
   </div>
 )
 
 if (!user) return null

 return (
   <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
     {/* Header */}
     <div className="p-6 border-b border-gray-200">
       <div className="flex flex-col md:flex-row items-start gap-6">
         <img 
           src={user.avatar_url} 
           alt={user.name} 
           className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-2 ring-gray-100 flex-shrink-0"
         />
         <div className="flex-1 min-w-0">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
               <h1 className="text-2xl font-semibold text-gray-900 truncate">{user.name}</h1>
               <p className="text-lg text-gray-600">@{user.login}</p>
             </div>
             <div className="flex flex-wrap gap-2">
               <a 
                 href={user.html_url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
               >
                 View on GitHub
               </a>
               {user.hireable && (
                 <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                   Open to work
                 </span>
               )}
             </div>
           </div>

           {user.bio && (
             <p className="mt-4 text-gray-600 max-w-3xl">{user.bio}</p>
           )}

           <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="text-center px-4 py-3 bg-gray-50 rounded-lg">
               <div className="text-xl font-semibold text-gray-900">{user.public_repos}</div>
               <div className="text-sm text-gray-500">Repositories</div>
             </div>
             <div className="text-center px-4 py-3 bg-gray-50 rounded-lg">
               <div className="text-xl font-semibold text-gray-900">{user.followers}</div>
               <div className="text-sm text-gray-500">Followers</div>
             </div>
             <div className="text-center px-4 py-3 bg-gray-50 rounded-lg">
               <div className="text-xl font-semibold text-gray-900">{user.following}</div>
               <div className="text-sm text-gray-500">Following</div>
             </div>
             <div className="text-center px-4 py-3 bg-gray-50 rounded-lg">
               <div className="text-xl font-semibold text-gray-900">
                 {new Date(user.created_at).getFullYear()}
               </div>
               <div className="text-sm text-gray-500">Joined</div>
             </div>
           </div>

           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
             {user.company && (
               <div className="flex items-center gap-2 text-gray-600">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                   <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                 </svg>
                 <span>{user.company}</span>
               </div>
             )}
             {user.location && (
               <div className="flex items-center gap-2 text-gray-600">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                   <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                 </svg>
                 <span>{user.location}</span>
               </div>
             )}
             {user.email && (
               <div className="flex items-center gap-2 text-gray-600">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                   <path d="M.05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2A2 2 0 0 0 .05 3.555zM16 4.697l-5.875 3.59L16 11.743V4.697zm-.168 8.108A2 2 0 0 1 14 14H2a2 2 0 0 1-1.832-1.195L6 9.456l.75.409a1 1 0 0 0 .9 0L8 9.456l5.832 3.349zM0 11.743l5.875-3.456L0 4.697v7.046z"/>
                 </svg>
                 <a href={`mailto:${user.email}`} className="hover:text-blue-600 transition-colors">
                   {user.email}
                 </a>
               </div>
             )}
             {user.blog && (
               <div className="flex items-center gap-2 text-gray-600">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                   <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A11.07 11.07 0 0 0 5.1 5.368a11.17 11.17 0 0 0 2.4.111V1.077zM4.249 3.539A7.01 7.01 0 0 0 3.051 3.05a7.01 7.01 0 0 0 2.476 1.098 11.07 11.07 0 0 0-.45-1.605 9.34 9.34 0 0 0-.828-.996zm.12 9.922A7.01 7.01 0 0 0 3.051 12.95a7.01 7.01 0 0 0 2.476-1.098 11.07 11.07 0 0 0-.45 1.605 9.34 9.34 0 0 0-.828.996z"/>
                 </svg>
                 <a 
                   href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                   target="_blank"
                   rel="noopener noreferrer" 
                   className="hover:text-blue-600 transition-colors truncate"
                 >
                   {user.blog}
                 </a>
               </div>
             )}
             {user.twitter_username && (
               <div className="flex items-center gap-2 text-gray-600">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                   <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                 </svg>
                 <a 
                   href={`https://twitter.com/${user.twitter_username}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="hover:text-blue-600 transition-colors"
                 >
                   @{user.twitter_username}
                 </a>
               </div>
             )}
           </div>
         </div>
       </div>
     </div>

     {/* Activity Section */}
     <div className="p-6">
       <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
       <div className="space-y-4">
         {activities.slice(0, 5).map((activity) => (
           <div 
             key={activity.id}
             className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
           >
             <div className="flex items-center gap-2">
               <span className="font-medium text-gray-900">
                 {activity.type.replace('Event', '')}
               </span>
               <span className="text-gray-600">on</span>
               <a 
                 href={`https://github.com/${activity.repo.name}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:underline font-medium"
               >
                 {activity.repo.name}
               </a>
             </div>
             {activity.payload?.commits && (
               <p className="mt-2 text-gray-600 pl-4 border-l-2 border-gray-200">
                 {activity.payload.commits[0].message}
               </p>
             )}
             <p className="text-sm text-gray-500 mt-2">
               {new Date(activity.created_at).toLocaleDateString('en-US', {
                 year: 'numeric',
                 month: 'long',
                 day: 'numeric',
                 hour: '2-digit',
                 minute: '2-digit'
               })}
             </p>
           </div>
         ))}
       </div>
     </div>
   </div>
 )
}