import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div>
        <h2>Page Not Found</h2>
        <p> The page you are trying to see does not found.</p>
        <Link href={"/"}> Return Home</Link>
        </div>
  )
}

export default NotFound
