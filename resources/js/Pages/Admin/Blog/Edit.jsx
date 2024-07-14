import React, { useState } from 'react'
import AdminLayout from '../../../Layouts/Admin/AdminLayout'
import { ToggleSwitch } from 'flowbite-react'
import { ChevronsLeft, Trash2 } from 'lucide-react'
import { Link, useForm } from '@inertiajs/react'
import ReactSelect from 'react-select'

const Edit = ({navActive, blog, categories}) => {
    const { data, setData, put, processing, errors } = useForm({
        title: blog.title,
        summary: blog.summary,
        body: blog.body,
        cover_img: blog.cover_img,
        is_archive: blog.is_archive,
        categories_id: blog.categories.map((format) => ({ category_id: format.id, categories_name: format.name })),
    });
    // console.log(blog.categories)

    //publish toggle ================================
    const [isPublish, setIsArchive] = useState(!blog.is_archive)

    const handleTogglePublish = () => {
        setIsArchive(!isPublish)
        setData('is_archive', isPublish)
    }

    //submit ================================
    const submit = (e) => {
        e.preventDefault();
        put(route('blogs.update', { blog: blog.id }) ,data);
    }


    //list category ================================
    // category view (add category button state)
    const [categoryList, setCategoryList] = useState(blog.categories.length !== 0
        ? blog.categories.map((category) => (
            { category_id: category.id, category_name: category.name }
            ))
        : [{ category_id: '', category_name: '' }]);

    // used to adds new select element of category into categoryList object
    const handleAddCategory = () => {
        setCategoryList([...categoryList, { category_id: '', category_name: '' }])
    }

    // logic of remove the trash button at category list if there is only one object categoryList left
    const handleCategoryRemove = (index) => {
        const category = [...categoryList];
        category.splice(index, 1);
        setCategoryList(category);
        setData('categories_id', category);
    }

    const handleSelectChange = (e, index) => {
        // stores the new selected option into new index of an array to var
        const list = [...categoryList];
        // console.log(e);
        list[index]['category_id'] = e.value;
        list[index]['category_name'] = e.label;
        setCategoryList(list);
        setData('categories_id', categoryList);
    }
    // blog.categories.map((c,index) => console.log(c.id ))
    // console.log(categoryList)

    // const [filteredOptions, setFilteredOptions] = useState(categories.map((category) => ({
    //     value: category.id,
    //     label: category.name
    // })).filter((category) => !categoryList.some(item => item.category_id === category.value)));
    // console.log(categories)

    // select all the category options that have not been selected yet
    const filteredOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    })).filter((category) => !categoryList.some(item => item.category_id === category.value))


    return (
        <div className='flex flex-col py-12 px-10'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold'>Edit Post</h1>
                    <span>is there something that needs to be changed?</span>
                </div>
                <Link
                    className='flex hover:underline'
                    href={route('blogs.index')}
                    >
                    <ChevronsLeft /><span>Back</span>
                </Link>
            </div>

            <form onSubmit={submit} className='flex flex-col items-center'>
                <div className='flex flex-col w-3/4 my-8'>
                    <div className=' flex flex-col mt-4 border rounded-xl shadow-xl shadow-slate-50'>
                        <div className='flex flex-col px-5 py-4'>
                            <h1 className='text-lg'>Details</h1>
                            <span className='text-xs text-slate-500'>title, short summary, content, image</span>
                        </div>
                        <hr/>
                        <div className='flex flex-col px-5 py-4 space-y-4'>
                            <div className='flex flex-col'>
                                <input type='text' placeholder='Post title' className={'border-slate-400 rounded-lg px-5 py-3 ' + (errors.title && ' !border-red-500')}
                                    onChange={(e) => setData('title', e.target.value)}
                                    value={data.title}
                                />
                                {errors.title && <span className='text-red-500 text-sm'>{errors.title}</span>}
                            </div>
                            <div className='flex flex-col'>
                                <textarea placeholder='Summary' className={'border-slate-400 rounded-lg px-5 py-4 resize-none ' + (errors.summary && ' !border-red-500')} rows="5"
                                    onChange={(e) => setData('summary', e.target.value)}
                                    value={data.summary}
                                ></textarea>
                                {errors.summary && <span className='text-red-500 text-sm'>{errors.summary}</span>}
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='text-md'>Content</h2>
                                <textarea placeholder='Write something awesome...' className={'border-slate-400 rounded-lg px-5 py-4 mt-2 ' + (errors.body && ' !border-red-500')} rows="15"
                                    onChange={(e) => setData('body', e.target.value)}
                                    value={data.body}
                                ></textarea>
                                {errors.body && <span className='text-red-500 text-sm'>{errors.body}</span>}
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='text-md'>Cover</h2>
                                <input type='file' className='mt-2'/>
                            </div>
                        </div>
                    </div>

                    <div className=' flex flex-col mt-4 border rounded-xl shadow-xl shadow-slate-50'>
                        <div className='flex flex-col px-5 py-4'>
                            <h1 className='text-lg'>Properties</h1>
                            <span className='text-xs text-slate-500'>Additional attributes...</span>
                        </div>
                        <hr />
                        <div className='flex flex-col px-5 py-4 space-y-4'>
                            {categoryList.map((category, index) => (
                                <div key={index}>
                                    <div className='flex items-start space-x-2'>
                                        <div className='flex grow flex-col'>
                                            <ReactSelect className='grow '
                                                placeholder={category.category_name}
                                                options={filteredOptions}
                                                onChange={(e) => handleSelectChange(e, index)}
                                            />
                                            {errors.categories_id && (<span className='text-red-500 text-sm'>{errors.categories_id}</span>)}
                                        </div>

                                        {categoryList.length > 1 && (
                                            <button type='button' onClick={() => handleCategoryRemove(index)} className='border border-slate-400 rounded-md p-2 hover:bg-red-500 hover:text-white hover:border-red-500'>
                                                <Trash2 className=' w-5 h-5' />
                                            </button>
                                        )}
                                    </div>

                                    {/* show button at the last of list and limit by total data (length of data categories is total) */}
                                    {categoryList.length - 1 === index && categoryList.length < categories.length && (
                                        <button type='button' className='flex w-fit text-cyan-500 hover:text-cyan-600 mt-4' onClick={handleAddCategory}><span>+ Add Category</span></button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex self-end items-center mt-5 '>
                        {/* toggle publish / archive */}
                        <div className='flex space-x-3 w-28 mr-6'>
                            <ToggleSwitch checked={isPublish} onChange={handleTogglePublish} />
                            <span>{isPublish ? 'Publish' : 'Archive'}</span>
                        </div>

                        {/* button update post */}
                        <button type='submit' className='bg-slate-800 text-white px-4 py-2 rounded-lg' disabled={processing}>Update Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

Edit.layout = page => <AdminLayout children={page} navActive={page.props.navActive}/>

export default Edit
