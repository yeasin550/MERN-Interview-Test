/* eslint-disable react/prop-types */
import { Dialog } from '@headlessui/react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Modal from '../../CommonComponents/Modal';
import { Form, FormField } from '../../CommonComponents/Form';
import { editDrawing, saveDrawing } from '../../../Hooks/reactAxiosQuery';
import { queryClient } from '../../../Hooks/axiosQuery';
import Loading from '../../CommonComponents/Loading';

const DrawingModal = ({ isOpen, close, elements, title, description }) => {
    const { drawingId } = useParams();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(drawingId ? editDrawing : saveDrawing, {
        onMutate: async (newDrawing) => {
            const previousDrawings = queryClient.getQueryData('drawings');
            queryClient.setQueryData('drawings', newDrawing);
            return { previousDrawings };
        },

        onSuccess: () => {
            close();
            toast.success(`Drawing ${drawingId ? "updated" : "saved"} successfully`);
            navigate("/exploreDrawings");
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message);
        }
    });

    const handleSubmit = async (data) => {
        const { title, description } = data || { title: "", description: "" };
        const payload = { title, description, elements };
        if (drawingId) payload["id"] = drawingId;
        mutate(payload);
    };

    return (
        <Modal isOpen={isOpen} close={close}>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-8 text-gray-900"
            >
                Enter the Title and Description for your Drawing!
            </Dialog.Title>

            <Form onSubmit={handleSubmit} className="flex flex-col items-center justify-center px-2 md:px-0 mt-4 space-y-4">
                <FormField
                    required
                    name="title"
                    type="text"
                >
                    {({ errors, ...props }) => (
                        <div className="flex flex-col gap-2 w-full">
                            <input
                                {...props}
                                placeholder='Title'
                                defaultValue={title}
                                className={`shadow-sm block px-3 py-2 border rounded-md placeholder-gray-400 sm:text-sm focus:outline-none focus:border-indigo-600 ${errors ? "border-red-600" : ""}`}
                            />
                            {errors && (<p className="text-xs text-error-red capitalize">{errors.message}</p>)}
                        </div>
                    )}
                </FormField>

                <FormField
                    required
                    name="description"
                    type="text"
                >
                    {({ errors, ...props }) => (
                        <div className="flex flex-col gap-2 w-full">
                            <textarea
                                {...props}
                                rows={3}
                                placeholder='Description'
                                defaultValue={description}
                                className={`shadow-sm block px-3 py-2 border rounded-md placeholder-gray-400 sm:text-sm focus:outline-none focus:border-indigo-600 ${errors ? "border-red-600" : ""}`}
                            />
                            {errors && (<p className="text-xs text-error-red capitalize">{errors.message}</p>)}
                        </div>
                    )}
                </FormField>

                <div className="mt-4 flex items-center space-x-4 justify-end w-full">
                    <button type='button' kind='secondary' onClick={close}>Cancel</button>
                    {/* <button disabled={isLoading} loading={isLoading} type='submit'>Save</button> */}
                    <button disabled={isLoading} type="submit">
                        {isLoading ? <Loading /> : 'Save'}
                    </button>

                </div>
            </Form>
        </Modal>
    );
};

export default DrawingModal;
