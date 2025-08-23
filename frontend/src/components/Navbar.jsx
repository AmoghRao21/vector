'use client'
import { MenuIcon, UserIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)

  const navItems = [
    { title: 'Components', link: '/components' },
    { title: 'Templates', link: 'templates' },
    { title: 'Pages', link: '/pages' },
    { title: 'Blogs', link: '/blogs' },
  ]

  return (
    <nav className="absolute top-6 left-1/2 z-50 mx-auto flex w-[95%] -translate-x-1/2 flex-col items-center gap-2 rounded-[30px] bg-[#6EACDA] p-2 text-base font-normal text-white sm:w-1/2 md:w-max md:flex-row md:gap-5 md:rounded-full md:p-1 md:pl-1.5">
      <div className="flex w-full justify-between gap-4 md:w-auto">
        <a href="/">
          <img
            src="https://ik.imagekit.io/cpnw7c0xpe/Tailwind%20Components/flexy-ui-logo.png?updatedAt=1718900668015"
            alt="Flexy UI Logo"
            width={44}
            height={44}
            className="rounded-full border-r-2 border-transparent transition-all duration-300 hover:border-[#187DF4] active:scale-95"
          />
        </a>

        <button onClick={() => setShowNav(!showNav)} className="mr-3 md:hidden">
          {showNav ? <XIcon size={30} /> : <MenuIcon size={30} />}
        </button>
      </div>

      <div
        className={`${showNav ? 'flex' : 'hidden'} flex-col items-center gap-2 md:flex md:flex-row md:gap-5`}
      >
        {navItems.map(({ title, link }) => (
          <a
            href={`/${link}`}
            key={title}
            className="rounded-full border-b-2 border-transparent px-4 py-1 text-lg [letter-spacing:1px] transition-colors duration-300 hover:border-[#187DF4]"
          >
            {title}
          </a>
        ))}

        <a
          href="https://www.linkedin.com/in/abdulbasitprofile/"
          target="_blank"
          className="font-neuton flex items-center gap-1 rounded-full border-l-2 border-transparent bg-[#03346E] px-3 py-2.5 transition-all duration-300 hover:border-[#187DF4] active:scale-95"
        >
          <div className="rounded-full bg-white p-1">
            <UserIcon width={13} height={13} color="#03346E" />
          </div>
          <span className="text-center text-base text-white">Contact</span>
        </a>
      </div>
    </nav>
  )
}

export default Navbar