import React from 'react';

export const Container: React.FC<{children: React.ReactNode}> = function ({children}) {
    return <div className="container">{children}</div>;
};

export const Card: React.FC<{title: string; url: string; children: React.ReactNode}> = function ({
    title,
    url,
    children,
}) {
    return (
        <div className="card text-bg-light m-4">
            <div className="card-body">
                <h5 className="card-title">
                    <a href={url} target="_blank">
                        {title}
                    </a>
                </h5>
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
