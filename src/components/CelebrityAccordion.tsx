import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditUser from './EditUser'; // Import the EditUser component

interface Celebrity {
    id: number;
    first: string;
    last: string;
    dob: string;
    gender: string;
    country: string;
    description: string;
    picture: string; // Assuming there's a picture field
}

interface CelebrityAccordionProps {
    user: Celebrity;
    onDelete: (id: number) => void;
    onEdit: (updatedUser: Celebrity) => void;
}

const CelebrityAccordion: React.FC<CelebrityAccordionProps> = ({ user, onDelete, onEdit }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false); // State to track editing

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleEdit = (updatedUser: Celebrity) => {
        onEdit(updatedUser); // Call the onEdit function passed as a prop
        setIsEditing(false); // Close the edit mode
    };

    return (
        <div style={containerStyle}>
            <div onClick={toggleAccordion} style={headerStyle}>
                <img src={user.picture} alt={`${user.first} ${user.last}`} style={imageStyle} />
                <h2 style={nameStyle}>{`${user.first} ${user.last}`}</h2>
                <span style={toggleIconStyle}>{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && !isEditing && (
                <div style={detailsStyle}>
                    <div style={infoRowStyle}>
                        <span><strong>Age:</strong> {new Date().getFullYear() - new Date(user.dob).getFullYear()} Years</span>
                        <span><strong>Gender:</strong> {user.gender}</span>
                        <span><strong>Country:</strong> {user.country}</span>
                    </div>
                    <div style={descriptionStyle}>
                        <strong>Description:</strong>
                        <p>{user.description}</p>
                    </div>
                    <div style={buttonContainerStyle}>
                        <button onClick={() => onDelete(user.id)} style={deleteButtonStyle}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button onClick={() => setIsEditing(true)} style={editButtonStyle}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                </div>
            )}
            {isOpen && isEditing && (
                <EditUser user={user} onEdit={handleEdit} onCancel={() => setIsEditing(false)} />
            )}
        </div>
    );
};

// Styles
const containerStyle: React.CSSProperties = {
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    padding: '15px',
    width: '100%',
    maxWidth: '400px', // Max width for larger screens
    margin: '0 auto', // Center on the page
};

const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
};

const imageStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
};

const nameStyle: React.CSSProperties = {
    flex: 1,
    margin: 0,
};

const toggleIconStyle: React.CSSProperties = {
    marginLeft: '10px',
};

const detailsStyle: React.CSSProperties = {
    padding: '10px 0',
};

const infoRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
};

const descriptionStyle: React.CSSProperties = {
    marginBottom: '10px',
};

const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
};

const deleteButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'red',
    marginLeft: '10px',
};

const editButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'blue',
    marginLeft: '10px',
};

// Media Queries for Responsiveness
const mediaQueries = `
    @media (max-width: 600px) {
        ${containerStyle}
        padding: '10px';
        max-width: '90%'; // Full width on mobile
    }
`;

export default CelebrityAccordion;