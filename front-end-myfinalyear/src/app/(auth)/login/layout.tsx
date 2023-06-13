import React from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  return <section className={'pt-[60px]'}> {children}</section>
}