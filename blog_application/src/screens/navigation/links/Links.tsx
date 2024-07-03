import Link from 'next/link';
import React from 'react'

const links = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Blogs",
        path: "/blog",
    },
    {
        title: "Liked",
        path: "/liked",
    }
];

const Links = () => {
  return (
    <div>
        {links.map((link => (
            <Link href={link.path} key={link.title}>{link.title}</Link>
        )))}
    </div>
  )
}

export default Links