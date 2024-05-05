import { ReactNode } from 'react';
import LoadingIndicator, { LoadingIndicatorProps } from './LoadingIndicator';

export interface LoadingProps extends Partial<LoadingIndicatorProps> {
    isLoading?: boolean;
    children: ReactNode;
}

const Loading = ({
    isLoading = false,
    children,
    className,
    ...props
}: LoadingProps) => {
    return (
        <>
            {!isLoading && children}
            {isLoading && (
                <div className='absolute left-1/2 top-1/2 w-8 h-8 -translate-x-8 -translate-y-8 z-50'>
                    <LoadingIndicator
                        className={`h-12 w-12 ${className}`}
                        {...props}
                    />
                </div>
            )}
        </>
    );
};

export default Loading;
