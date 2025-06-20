import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, onClick, type = 'button', ...props }) => {
    return (
        <button
            type={type}
            className={`button ${className || ''}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;