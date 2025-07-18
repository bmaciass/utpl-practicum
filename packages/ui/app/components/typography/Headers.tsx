import type { PropsWithChildren } from 'react'

function TypographyH1 (props: PropsWithChildren) {
  return (
    <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight text-balance'>{props.children}</h1>
  )
}

function TypographyH2 (props: PropsWithChildren) {
  return (
    <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
      {props.children}
    </h2>
  )
}

function TypographyH3 (props: PropsWithChildren) {
  return (
    <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
      {props.children}
    </h3>
  )
}

function TypographyH4 (props: PropsWithChildren) {
  return (
    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
      {props.children}
    </h4>
  )
}

type TitleProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4'
}

export const Title = (props: PropsWithChildren<TitleProps>) => {
  switch (props.variant) {
    case 'h1': return <TypographyH1>{props.children}</TypographyH1>
    case 'h2': return <TypographyH2>{props.children}</TypographyH2>
    case 'h3': return <TypographyH3>{props.children}</TypographyH3>
    default: return <TypographyH4>{props.children}</TypographyH4>
  }
}
