import {useState, useEffect} from "react";
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import NotFound from './NotFound/NotFound';
import imageAPI from '.././helpers/api';
import './App.css'

function App() { 
  const [images, setImages] = useState([]);
  const [searchImage, setSearchImage] = useState('');
  const [totalhits, setTotalhits] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImage, setCurrentImage] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    setStatus('loading');
    
    if (currentPage > 1) {
      imageAPI.fetchImages(searchImage, currentPage)
        .then(({hits}) => {
          setImages(i => [...i, ...hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setError('We have some problems');
          setStatus('reject');
        });
      
      return;
    };
    
    imageAPI.fetchImages(searchImage, currentPage)
      .then(({hits, totalHits}) => {
        setImages(hits);
        setTotalhits(totalHits);
        setStatus('resolved');
      })
      .catch(error => {
          setError('We have some problems');
          setStatus('reject');
      }); 
  }, [searchImage, currentPage]);  
  
  const formSubmitHandler  = searchImage => {
    setSearchImage(searchImage)
    setCurrentPage(1)
  };
  
  const onBtnClickToNextPage = () => {
    setCurrentPage(cp => (cp + 1));
  };
  
  const onImageClick = (imageURL) => {
    setCurrentImage(imageURL);
    setShowModal(true);
  };
  
  const onToggleModalShow = () => {
    setShowModal(false);
  };
     
    return (
      <div className="App">
        <Searchbar onSubmit={formSubmitHandler} />       
               
        <ImageGallery images={images} onClick={ onImageClick} />
        
        {status === 'loading' && <Loader />}
     
        {error !== null && <NotFound message={error} />}
        
        {status === 'resolved' && images.length ===0 && <NotFound message={`There aren’t any images with the name: ${searchImage}`} /> }
        
        {images.length !== 0 && images.length < totalhits && status === 'resolved' && <Button onClick={onBtnClickToNextPage} />}
        
        {showModal && <Modal onToggleModalShow={onToggleModalShow}>{currentImage }</Modal>}
        
      </div>
    );
};

export default App;