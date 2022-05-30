import React from 'react'
import PropTypes from 'prop-types';
import './FilesDragAndDrop.scss'

export default function FilesDragAndDrop({ onUpload, children, count, formats }) {
    const drop = React.useRef(null);
    React.useEffect(() => {
        const instance = drop.current;
        instance.addEventListener('dragover', handleDragOver);
        instance.addEventListener('drop', handleDrop);

        return () => {
            instance.removeEventListener('dragover', handleDragOver);
            instance.removeEventListener('drop', handleDrop);
        };
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // this is required to convert FileList object to array
        const files = [...e.dataTransfer.files];

        // check if the provided count prop is less than uploaded count of files
        if (count && count < files.length) {
            console.log(`Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`);
            return;
        }

        // check if some uploaded file is not in one of the allowed formats
        if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
            console.log(`Only following file formats are acceptable: ${formats.join(', ')}`);
            return;
        }

        if (files && files.length) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onUpload(e.target.result);
            };
            reader.readAsText(files[0]);
        }
    };

    return (
        <div
            ref={drop}
            className='FilesDragAndDrop'
        >
            {children}
        </div>
    );
}

FilesDragAndDrop.propTypes = {
    onUpload: PropTypes.func.isRequired,
}