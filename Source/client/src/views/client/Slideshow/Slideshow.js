import './Slideshow.scss'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
const Slideshow = () => {
    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '500px'
    }
    const slideImages = [
        {
            url: img1,
            caption: 'Slide 1'
        },
        {
            url: img2,
            caption: 'Slide 2'
        },
        {
            url: img3,
            caption: 'Slide 3'
        },
    ];
    return (
        <div className="slide-container">
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}
export default Slideshow;