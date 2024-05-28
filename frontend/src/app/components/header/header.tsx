import classNames from 'classnames'
import { type ComponentPropsWithoutRef, type FC } from 'react'
import { FingerPrintIcon } from '@/ui/icons'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

interface Props extends ComponentPropsWithoutRef<'nav'> {}

/**
 * Header component renders the navigation bar with the application title,
 * navigation links, and wallet connect button.
 *
 * @param props - React component props for a <nav> element.
 */
export const Header: FC<Props> = props => {
  const { className, ...restProps } = props

  return (
    <nav
      className={classNames(
        'bg-base-300 px-6 py-4 border-b-2 border-base-100',
        className
      )}
      {...restProps}
    >
      <div className="flex justify-between items-center">
        {/* Logo and Title Section */}
        <div className="flex items-center">
          <h1 className="text-3xl text-primary">KYC Wonder</h1>
          <FingerPrintIcon className="fill-primary ml-2" />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 items-center">
          <Link href="/">
            <h2 className="cursor-pointer">Identities</h2>
          </Link>
          <Link href="/kyc">
            <h2 className="cursor-pointer">KYC</h2>
          </Link>
        </div>

        {/* Wallet Connect Button */}
        <ConnectButton showBalance={false} />
      </div>
    </nav>
  )
}
