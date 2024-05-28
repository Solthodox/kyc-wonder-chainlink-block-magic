import { WarningIcon } from '@/ui/icons'
import { KycView } from './components/kyc-view'

/**
 * Home page component displaying the KYC view and a warning message.
 *
 * @returns JSX.Element
 */
export default function Home(): JSX.Element {
  return (
    <main className="max-h-full min-w-full bg-base-300 p-16 overflow-y-auto">
      {/* Warning message */}
      <div className="bg-warning p-4 flex mb-4" role="alert">
        <WarningIcon className="fill-white mr-4" />
        <p>
          Avoid using the same identity for extended periods to enhance privacy.
        </p>
      </div>
      {/* KYC view component */}
      <KycView />
    </main>
  )
}
