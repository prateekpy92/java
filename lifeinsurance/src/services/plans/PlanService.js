import axios from "axios"
export const EditPlans=async(pageNumber,pageSize)=>{

  let response = await axios.put(`http://localhost:8081/insuranceapp/Plan`,{
    params:
    {
        
        
    }
}
)

return response

}

export const GetAllPlans = async (pageNumber=0,pageSize=10)=> {
  try {
      
  let response = await axios.get(`http://localhost:8081/insuranceapp/allPlan`,{
      params:
      {
          pageNumber:pageNumber,
          pageSize:pageSize
          
      },
      headers:
      {
          Authorization:localStorage.getItem('auth')
      },
  }
  )
  
  return response
  
  } catch (error) {
      throw error
  }
  }  