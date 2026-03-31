import Link from 'next/link'

interface ButtonProps {
  href?: string
  variant?: 'solid' | 'gold' | 'outline' | 'outline-light' | 'ghost'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

const variantStyles = {
  solid: 'bg-navy text-white hover:bg-navy-light border border-navy',
  gold: 'bg-gold text-white hover:bg-gold-dark border border-gold',
  outline: 'bg-transparent text-navy border border-navy/30 hover:bg-navy hover:text-white',
  'outline-light': 'bg-transparent text-white border border-white/25 hover:bg-white/10',
  ghost: 'bg-transparent text-navy hover:text-gold',
}

export default function Button({ href, variant = 'solid', children, className = '', type = 'button', onClick }: ButtonProps) {
  const styles = `inline-flex items-center justify-center px-7 py-3 text-[11.5px] font-sans font-medium tracking-[0.12em] uppercase transition-all duration-300 ease-smooth rounded-[2px] ${variantStyles[variant]} ${className}`

  if (href) {
    return <Link href={href} className={styles}>{children}</Link>
  }
  return <button type={type} onClick={onClick} className={styles}>{children}</button>
}
