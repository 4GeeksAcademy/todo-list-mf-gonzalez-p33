import React, { useState } from "react";
import "./Task.css";

const Task = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="d-flex justify-content-center">
            <div className="task-container d-flex justify-content-between col-8" 
                style={{ backgroundColor: props.color }}
                onMouseEnter={() => {
                    setIsHovered(true);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                }}>

                <div className="d-flex align-items-center m-2">
                    <input type="checkbox" className="mr-2" />
                    <p className="task-text ms-3 mb-0">{props.task}</p>
                </div>

                <div className="me-3"> 
                    {isHovered && (
                        <span 
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                props.onRemove();
                            }}> x
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Task;