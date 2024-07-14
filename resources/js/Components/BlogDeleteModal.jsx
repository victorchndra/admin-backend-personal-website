import React, { useRef } from 'react'
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from 'flowbite-react'
import { useForm } from '@inertiajs/react';

const BlogDeleteModal = ({ post, modalDelete, setModalDelete }) => {
    const { delete: destroy } = useForm();

    const modalRef = useRef(null);

    const deletePost = (e) => {
        e.preventDefault();
        destroy(route('blogs.destroy', post.id))
        setModalDelete(false)
    }

    return (
        <Modal show={modalDelete} size="md" onClose={() => setModalDelete(false)} popup ref={modalRef}>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this post?
                    </h3>
                    <div className="flex justify-center gap-4">

                    <form onSubmit={deletePost} method='delete'>
                        <Button type='submit' color="failure">
                            {"Yes, I'm sure"}
                        </Button>
                    </form>

                    <Button type="button" color="gray" onClick={() => setModalDelete(false)}>
                        No, cancel
                    </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default BlogDeleteModal
