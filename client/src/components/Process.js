import React, {useState} from 'react'

const Process = ({resolveHandler}) => {
    const [show, setShow] = useState(false);

    const handler = () => {
        setShow(!show);
        resolveHandler()
    }
    
    return (
        <button className={show ? "msg green" : "msg"} onClick={handler} >
            {
                show ? <>Resolve</> : <>Resolved</>
            }
        </button>
    )
}

export default Process