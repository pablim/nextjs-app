import React, { Fragment } from 'react'
import Link from 'next/link'

export function ButtonLink({ href, name }) {
  return (
    <div >
      <Link href='/login' legacyBehavior>
        <a>
          Acessar conta
        </a>
      </Link>
    </div>
  )
}


