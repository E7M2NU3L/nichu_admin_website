import React from 'react';

const HTMLContentDisplay = ({ htmlContent }) => {
    // Make sure to sanitize the content before using it with dangerouslySetInnerHTML
    // For demonstration purposes, assuming the content is sanitized.
    return (
        <div
            // Use dangerouslySetInnerHTML to render HTML content
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

const DisplayAPI = ({context}) => {
    // Example HTML content received from react-quill
    const quillContent = context;

    return (
        <div>
            {/* Pass the HTML content to the component */}
            <HTMLContentDisplay htmlContent={quillContent} />
        </div>
    );
};

export default DisplayAPI;
