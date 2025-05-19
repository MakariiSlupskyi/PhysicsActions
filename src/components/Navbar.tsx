import { Link } from 'react-router-dom';

const Navbar = ({ page }: { page: string }) => {
  return (
    <div className='absolute top-3 left-1/2 -translate-x-1/2 flex gap-3 ml-auto px-3 py-1 bg-white border border-black rounded-xl'>
      <Link to="/">
        <p className={page === 'home' ? 'font-bold' : ''}>Home</p>
      </Link>
      <Link to="/coriolis">
        <p className={page === 'coriolis' ? 'font-bold' : ''}>Coriolis</p>
      </Link>
    </div>
  )
}

export default Navbar