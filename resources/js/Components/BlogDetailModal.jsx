import { useState } from 'react'

const BlogDetailModal = () => {
    const [modal, setModal] = useState(false);

    return (
        <>
            <div className='modal'>
                <div className='overlay'></div>

            </div>
        </>
    )
}

export default BlogDetailModal
