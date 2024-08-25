//This is a general wrapper to make almost any component inside it behave in a generalized standard way
//Imports
import React, { ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
//Define the wrapper's children type to avoid indefinition errors
type WrapperProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
//Main wrapper definition
export default function Wrapper({ children, className, ...rest }: WrapperProps) {
  return (
    <div className={classNames("inline-flex items-center justify-center p-2", className)} {...rest}>
      {children}
    </div>
  );
}
