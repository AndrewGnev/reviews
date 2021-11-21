import React from 'react';
import { Helmet } from 'react-helmet';

export interface PageProps {
    className?: string;
    title?: string;

    onClick?: React.MouseEventHandler;
}

export const Page: React.FC<PageProps> = ({ className, title, onClick, children }) => {
    return (
        <div onClick={onClick} className={`Page ${className ?? ''}`}>
            <Helmet>
                <title>
                    {title ? (
                        `Reviews - ${title}`
                    ) : (
                        'Reviews'
                    )}
                </title>
            </Helmet>

            {children}
        </div>
    );
};