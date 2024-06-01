import { KycView } from "./components/kyc-view";

/**
 * Home page component displaying the KYC view and a warning message.
 *
 * @returns JSX.Element
 */
export default function Home(): JSX.Element {
  return (
    <main className="max-h-full min-w-full p-16 overflow-y-auto">
      {/* KYC view component */}
      <KycView />
    </main>
  );
}
