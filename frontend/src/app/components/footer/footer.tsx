import classNames from "classnames";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { FingerPrintIcon } from "@/ui/icons";

interface Props extends ComponentPropsWithoutRef<"nav"> {}

/**
 * Footer component renders the footer of the application with a title, icon,
 * and creator information.
 *
 * @param props - React component props for a <nav> element.
 */
export const Footer: FC<Props> = (props) => {
  const { className, ...restProps } = props;

  return (
    <nav
      className={classNames(
        " px-6 py-4 border-t-2  border-base-100",
        className
      )}
      {...restProps}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-xl">KYC Wonder</h3>
          <FingerPrintIcon className="fill-base-200 ml-2" />
        </div>
        <p>
          Created by{" "}
          <a href="https://x.com/solthodox" target="_blank">
            <u>@solthodox</u>
          </a>
          ,
          <a href="https://x.com/filipeV3nancio" target="_blank">
            <u>@filipeV3nancio</u>
          </a>
          ,
          <a href="https://x.com/damarnez" target="_blank">
            <u>@damarnez</u>
          </a>
        </p>
      </div>
    </nav>
  );
};
