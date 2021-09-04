import React from 'react';

export default function Time({ time }) {
  const format = el => `0${Math.floor(el)}`.slice(-2) //formating each el in timer (00:00:00)
  const h = time / 3600
  const min = (time % 3600) / 60
  
  return (
     <div>
         {[h, min, time % 60].map(format).join(':')} 
     </div> 
  )
}
