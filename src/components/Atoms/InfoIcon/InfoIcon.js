// components/InfoIcon.js
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../styles/InfoIcon.module.css';


const InfoIcon = ({ infoText }) => {
  const [isVisible, setIsVisible] = useState(false);
  const infoRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (infoRef.current && !infoRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className={styles.infoContainer} ref={infoRef}>
      <span className={`${styles.infoIcon} inline-block h-5 w-5 flex items-center justify-center text-lightgreen bg-[#F2F2F2] rounded-full text-[12px] cursor-pointer`}
       
        onClick={toggleVisibility}
      >
        i
      </span>
      {isVisible && (
        <div className={styles.infoBox}>
          {infoText}
        </div>
      )}
    </div>
  );
};

export default InfoIcon;