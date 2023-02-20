import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { PulseLoader } from 'react-spinners';
import { v4 } from 'uuid';
import { useCreatePostMutation } from '../../generated/generated-types';
import { storage } from '../../utils/firebase/index';



interface MyFormValues {
    title: string;
    imageUrl: string[];
}



const CreatePost = () => {
    const [images, setImages] = useState<any[]>([]);
    const [, createPost] = useCreatePostMutation();
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const maxNumber = 4;
    const onChange = (imageList: any) => { setImages(imageList); }
    const initialForm: MyFormValues = { title: '', imageUrl: [] }

    const [title, setTitle] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        initialForm.title = title;
        setIsUploading(true);
        for (let i = 0; i < images.length; i++) {
            const imageRef = ref(storage, `images/${images[i].file.name + v4()}`);
            await uploadBytes(imageRef, images[i].file);
            const url = await getDownloadURL(imageRef);
            initialForm.imageUrl.push(url);
        }
        await createPost(initialForm);
        setIsUploading(false);
        router.push('/');
    }


    return (
        <div  datatest-id="create-post" className=' w-3/4 md:w-1/3 mx-auto   text-center h-full bg-gray-200 shadow-lg rounded mt-6'>
            <div className='pt-3'>
                <h1 className='font-extrabold  text-xl text-gray-800'>Create a post</h1>
            </div>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className='px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <div className='text-start font-bold p-2 text-base text-gray-600'>
                        <label htmlFor="password" className=''>Title</label>
                    </div>
                    <textarea
                        name="title"
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        required
                        className='w-full shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                {!isUploading && (
                    <div className=' flex flex-col items-center justify-center w-full h-auto'>
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                isDragging,
                                dragProps,
                            }) => (
                                <div>
                                    <div className="cursor-pointer flex flex-col md:flex-row items-center justify-center">
                                        <div
                                            style={isDragging ? { color: 'red' } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                            className='bg-slate-700 w-full md:mr-8 text-sm font-base hover:bg-slate-800 rounded-3xl border-2 p-2 text-slate-100'
                                        >
                                            Choose images
                                        </div>
                                        &nbsp;
                                        <div
                                            onClick={onImageRemoveAll}
                                            className='cursor-pointer bg-pink-700 w-full font-base text-sm hover:bg-pink-800 rounded-3xl border-2 p-2 text-slate-100'
                                        >
                                            Remove all images
                                        </div>
                                    </div>
                                    {imageList.length > 0 && (
                                        <div className="flex items-start justify-start  p-1 flex-wrap mt-5 gap-2">
                                            {imageList.map((image, index) => (
                                                <p key={index} className='text-xs font-semibold border-2 border-b-gray-400'>{image.file?.name}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                )}
                <br />
                <button type="submit" disabled={isUploading} className={`bg-teal-500 hover:bg-teal-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                    Confirm
                </button>
                <div className='pt-6'>
                    <PulseLoader color="#36d7b7" size={14} loading={isUploading} />
                </div>
            </form>

        </div>
    );
}

export default CreatePost;