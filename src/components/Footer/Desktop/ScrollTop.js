import { useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function ScrollToTop() {


  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const toTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }

  const scrollerStyle = {
    cursor: 'pointer',
   
    fontSize: '20px',
    zIndex:'3',

    backgroundColor:'#191919'
    
  }

  return (
    <div className="scroller p-3" style={scrollerStyle} onClick={toTop}>
      Back to Top   <FontAwesomeIcon icon={faArrowUp}  />
    </div>
  )
}