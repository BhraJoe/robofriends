import React, { useState } from 'react';
import './index.css';

const Card = ({title, description}) => {
    const [isHover, setIsHover] = useState(false);
    
    const style = {
        card: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '16px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            backgroundColor: '#f0f0f0',
            transform: isHover ? 'translateY(-5px)' : 'none',
            boxShadow: isHover ? '0 6px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
        }
    };

    return (
        <div 
            style={style.card}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="Card">
                <img src={`https://robohash.org/${title}?100x100`} alt="Robot" />
                <h2 className="Card-title">{title}</h2>
                <p className="Card-description">{description}</p>
            </div>
        </div>
    );
}

export default Card;
