import React,{ChangeEvent, useState} from 'react'
import {BiSearch} from 'react-icons/bi'
import { CiFilter } from 'react-icons/ci'

type Post={
    url:string,
    tags:string[],
    title:string
} 

const posts:Post[] = [
    { 
      url: '',
      tags: ['react', 'blog'],
      title: 'I will go to Muea market tomorrow to buy groceries for my mother',
    },
    {
      url:'',
      tags: ['node','express'],
      title: 'Being alone is hard. I don\'t know how to do it',
    },
    {
        url:'',
        tags: ['node','express'],
        title: 'Being alone is hard. I don\'t will go to Muea market tomorrow to buy groceries  know how to do it',
      },
    // more data here
  ]
const SearchFilter = () => {
    const [state, setstate] = useState({
        query:'',
        list:[] as Post[]
    })
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const results = posts.filter(post =>{
            if(e.target.value === "") return posts
            return post.title.toLowerCase().includes(e.target.value.toLocaleLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results

        })
    }
  return (
    <>
    <div className='w-full flex justify-evenly items-center'>
        <form className='flex justify-between items-center border-b-2 border-gray-500'>
            <input
             type='search'
              placeholder='Type here to search' 
              value={state.query}
              onChange={handleChange}
              className='text-gray-900 focus:outline-none focus:border-none font-sans font-bold'/>
            <button className='text-2xl font-bold'><BiSearch/></button>
        </form>
       
        <div className='border-b-2 border-gray-500'>
            <span className='text-2xl font-bold'><CiFilter/></span>
        </div>
    </div>
     <ul>
            {
                (state.query === 'No posts match the query' ? "":state.list.map(post=>{
                    return <li key={post.title}>{post.title}</li>
                }))
            }
        </ul>
    </>
    
  )
}

export default SearchFilter