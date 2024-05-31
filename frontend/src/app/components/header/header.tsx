"use client";
import { type ComponentPropsWithoutRef, type FC } from "react";
import classNames from "classnames";
import { FingerPrintIcon } from "@/ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface Props extends ComponentPropsWithoutRef<"nav"> {}
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "KYC", href: "/kyc", current: false },
];

/**
 * Header component renders the navigation bar with the application title,
 * navigation links, and wallet connect button.
 *
 * @param props - React component props for a <nav> element.
 */
export const Header: FC<Props> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div className="min-h-full">
      <div className="bg-indigo-600 pb-32">
        <Disclosure
          as="nav"
          className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                  <div className="flex items-center px-2 lg:px-0">
                    <div className="flex-shrink-0">
                      <FingerPrintIcon className="fill-primary ml-2" />
                    </div>
                    <div className="hidden lg:ml-10 lg:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-indigo-700 text-white"
                                : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                              "rounded-md py-2 px-3 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                  <div className="hidden lg:ml-4 lg:block">
                    <div className="flex items-center">
                      {/* Profile dropdown */}
                      <ConnectButton showBalance={false} />
                    </div>
                  </div>
                </div>
              </div>

              <DisclosurePanel className="lg:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-indigo-700 text-white"
                          : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                        "block rounded-md py-2 px-3 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
                <div className="border-t border-indigo-700 pb-3 pt-4">
                  <div className="mt-3  px-2 full-with">
                    <ConnectButton showBalance={false} />
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
        <header className="py-5"></header>
      </div>
    </div>
  );
};
