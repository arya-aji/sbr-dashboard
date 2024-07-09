'use client';

import { useState } from 'react';
import Modal from '@/app/ui/invoices/Modal';

export default function ModalButton({ sample }: { sample: any }) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleOpenModal}
            >
                Update
            </button>
            {showModal && <Modal sample={sample} onClose={handleCloseModal} />}
        </>
    );
}
