import React, { useState } from 'react'

import Pagination from 'react-bootstrap/Pagination';


const PaginationApp = ({totalpage,setpage ,pageNumber})=>{ 

  console.log("total pages are "+totalpage)
const [active, setActive]=useState(1) ; 
let items = []

  items.push(<Pagination.Prev
   onClick={()=>{
    console.log("active is"+active)
    if(active==1)
    { setpage(totalpage-1)
      
    }

   else{
        setpage(pageNumber-1)
        
        
      
   }


   setActive(pageNumber)
  
   }
}
    ></Pagination.Prev>)
   for (let number = 1; number <=totalpage; number++) {
   items.push( <Pagination.Item key={number} active={number-1 === pageNumber}  onClick={()=>{
        setpage(number-1)
        setActive(number)
        console.log("active is"+active)
    }
      
       
        }>
      {number}
    </Pagination.Item>,
  );
      }
  items.push(<Pagination.Next
    onClick={()=>{
     console.log("active is"+active)
     if(active==totalpage)
     { setpage(0)
      setActive(pageNumber+1)
     }

     
 
    else{
         setpage(active)
         setActive(active+1);
       
    }
 
    
   
   
    }
 }
     ></Pagination.Next>)



  return(
    <div>
     
      <Pagination>
       
        {items}
      
     </Pagination>
      
      <br />
    </div>
  );

  
}

export default PaginationApp