import React, {useEffect, useState} from 'react'

function HeadNav(props) {

    const [scrolledPixels, setScrolledPixels] = useState(0);
    const handleScroll = () => {
      setScrolledPixels(window.scrollY);
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    useEffect(()=>{
      if(scrolledPixels > 47){
          const metaThemeColor = document.querySelector('meta[name=theme-color]');
          metaThemeColor.setAttribute('content', '#232429');
      }  else {
          const metaThemeColor = document.querySelector('meta[name=theme-color]');
          metaThemeColor.setAttribute('content', '#202124');
      }
    },[scrolledPixels])

  return (
    <div className='wrapper-headNav'>
        <h1 style={{display: scrolledPixels >47 ? "none":"block"}}> {props.title }</h1>
        <h2 style={{display: scrolledPixels >47 ? "block":"none"}}> {props.title}</h2>
    </div>
  )
}

export default HeadNav
