import { useLocation, useNavigate, useParams } from 'react-router-dom'
import arrowBack from '../assets/arrowBack.svg'


export default function BackButton() {
    const {pathname} = useLocation()
    const {id} = useParams()
    const navigate = useNavigate()
    const handleClickBack = () => {
       
        navigate(-1)  
    }
    return (
        <button onClick={handleClickBack} className='absolute px-4 py-1 border-2  border-black rounded-full right-3 md:right-24'>
            <img src={arrowBack} alt="Back Button" width={20} />
        </button>
    )
}