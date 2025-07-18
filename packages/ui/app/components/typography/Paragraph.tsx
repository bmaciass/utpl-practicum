import type { PropsWithChildren } from 'react'

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>

export function Paragraph ({ children, ...paragraphProps }: PropsWithChildren<ParagraphProps>) {
  const defaultClassName = 'leading-7 h-fit text-center'

  const props = { ...paragraphProps }

  if (!props.className) {
    props.className = defaultClassName
  }

  return <p {...props}>{children}</p>
}
