import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa6"; // Import icons
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice'; // Ensure action is imported

const Headers = () => {
  const path = useLocation().pathname;
  const currentuser = useSelector((state) => state?.user?.currentuser);
  console.log("currentuser",currentuser)
  const {theme} = useSelector(state => state.theme); // Get theme from Redux
  const dispatch = useDispatch(); 

  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Eman's Blog
        </span>
      </Link>

      <form>
        <TextInput
          type='text'
          placeholder="search...."
          rightIcon={AiOutlineSearch}
          className='hidden sm:inline'
        />
      </form>

      <Button className='w-12 h-10 lg:hidden md:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2'>
        <Button className='  w-12 h-10 sm:inline' pill color='gray' onClick={() => dispatch(toggleTheme())}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />} 
        </Button>

        {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user'
                img={currentuser?.photourl}
                rounded
                className=''
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>{currentuser?.email}</span>
            </Dropdown.Header>

            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>

            <Dropdown.Divider />

            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/signin'>
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Headers;
