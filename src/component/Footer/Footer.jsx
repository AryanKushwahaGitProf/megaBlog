import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const groups = [
  { title: 'Company', links: ['Features', 'Pricing', 'Affiliate Program', 'Press Kit'] },
  { title: 'Support', links: ['Account', 'Help', 'Contact Us', 'Customer Support'] },
  { title: 'Legal', links: ['Terms & Conditions', 'Privacy Policy', 'Licensing'] },
]

function Footer() {
  return (
    <footer className="mt-8 border-t border-line bg-sheet">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col justify-between gap-6">
          <Logo width="90px" />
          <p className="text-sm text-ink-muted">
            &copy; {new Date().getFullYear()} megablog. All rights reserved.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-sm font-semibold">{group.title}</h3>
            <ul className="space-y-2.5">
              {group.links.map((name) => (
                <li key={name}>
                  <Link
                    to="/"
                    className="text-sm text-ink-muted hover:text-ink hover:underline hover:decoration-marker-deep hover:decoration-2 hover:underline-offset-4"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

export default Footer