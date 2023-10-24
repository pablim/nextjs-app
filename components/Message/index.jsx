import React from "react";

const classesType = {
    error: "alert-danger" ,
    info: "alert-primary",
    warning: "alert-warning",
    sucess: "alert-success"
}

const Message = ({msgs, className}) => {

    const handleClose = (e) => {
        console.log(e);
        e.target.parentElement.remove()
        return
    }

    return (
        msgs && (
            <div className={`w-100 ${className}`}>
                {msgs.map((msg, idx) => 
                    <div key={idx} 
                        className={`p-2 alert ${classesType[msg.type]} d-flex justify-content-between`}
                    >
                        <div>
                            {typeof(msg) === 'array' ? 
                                msg.map((text, idx) => 
                                    <div key={idx}>{text}</div>
                                )
                            :
                                <div>{msg.text}</div>
                            } 
                        </div>
                        <div onClick={handleClose}>x</div>
                    </div>
                )}
            </div>
        )
    )
}

export default Message