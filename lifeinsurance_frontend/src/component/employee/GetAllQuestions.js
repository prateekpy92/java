import React, { useEffect, useState } from 'react';
import { getAllQuestions } from '../../services/employee/Employee';
import Table from '../shared/table/Table';
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import AddAnswer from './AddAnswer';
import PageSelect from '../shared/page/PageSizeSetter';

const GetAllQuestions = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5); 
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [data, setData] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answer, setAnswer] = useState('');

  const getAllQuestionsData = async () => {
    try {
      let response = await getAllQuestions(pageNumber, pageSize);
      setData(response.data.content);
      setTotalPages(Math.ceil(parseInt(response.headers['question-Count']) / pageSize));
      setTotalElements(parseInt(response.headers['question-Count']));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleUpdate = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowAnswerForm(true);
  };

  const handleCloseForm = () => {
    setShowAnswerForm(false);
    setSelectedQuestionId(null);
    setAnswer(''); 
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    
    handleCloseForm();
  };

  useEffect(() => {
    getAllQuestionsData();
  }, [pageNumber, pageSize]);

  return (
    <>
      <div>
        {showAnswerForm && (
          <div>
            <AddAnswer questionId={selectedQuestionId} handleCloseForm={handleCloseForm} />
            {/* <AddAnswer/> */}
          </div>
        )}
      </div>
      <div className='container'>
        <div className='row my-5'>
          <div className='col-4'>
            <PaginationApp
              totalPages={totalPages}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
            />
          </div>
          <div className='col-4'>
            {/* <input
              className='rounded-pill px-3 text-primary fw-bold'
              placeholder='search here'
            ></input> */}
          </div>
          <div className='col-2 offset-2'>
            <PageSizeSetter
              totalElements={totalElements}
              setPageSize={setPageSize}
              setTotalpage={setTotalPages}
              pageSize={pageSize}
              totalPages={totalPages}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}

              
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <Table data={data} 
             
            Answer={true} answerFun={handleUpdate} />
          </div>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className='text-center fw-bold text-danger fs-1'> No Question Found </div>
      ) : null}
    </>
  );
};

export default GetAllQuestions;



// import React, { useEffect, useState } from 'react';
// import { getAllQuestions } from '../../services/employee/Employee';
// import Table from '../shared/table/Table';
// import PaginationApp from '../shared/page/PaginationApp';
// import PageSelect from '../shared/page/PageSizeSetter';
// import AddAnswer from './AddAnswer';

// const GetAllQuestions = () => {
//   const [pageNumber, setPageNumber] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalPages, setTotalPages] = useState();
//   const [totalElements, setTotalElements] = useState();
//   const [data, setData] = useState([]);
//   const [selectedQuestionId, setSelectedQuestionId] = useState(null);
//   const [showAnswerForm, setShowAnswerForm] = useState(false);
//   const [answer, setAnswer] = useState('');

//   const GetAllQuestionsData = async () => {
//     try {
//       let response = await getAllQuestions(pageNumber, pageSize);
//       setData(response.data.content);
//       setTotalPages(Math.ceil(parseInt(response.headers['question-count']) / pageSize));
//       setTotalElements(parseInt(response.headers['question-count']));
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   const handleUpdate = (questionId) => {
//     setSelectedQuestionId(questionId);
//     setShowAnswerForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowAnswerForm(false);
//     setSelectedQuestionId(null);
//     setAnswer(''); // Clear the answer field when closing the form
//   };

//   const handleAnswerSubmit = async (e) => {
//     e.preventDefault();
//     // Implement logic to submit the answer
//     // You can use the selectedQuestionId and answer data
//     // You may want to fetch the question details first (optional)
//     // Then submit the answer using a service
//     // After submission, close the form
//     handleCloseForm();
//   };

//   useEffect(() => {
//     GetAllQuestionsData();
//   }, [pageNumber, pageSize]);

//   return (
//     <>
//       <div>
//         {showAnswerForm && (
//           <div>
//             <AddAnswer questionId={selectedQuestionId} handleCloseForm={handleCloseForm} />
//             {/* <AddAnswer/> */}
//           </div>
//         )}
//       </div>
//       <div className='container'>
//         <div className='row my-5'>
//           <div className='col-4'>
//             <PaginationApp
//               totalPages={totalPages}
//               pageSize={pageSize}
//               setPageNumber={setPageNumber}
//               pageNumber={pageNumber}
//             />
//           </div>
//           <div className='col-4'>
//             {/* <input
//               className='rounded-pill px-3 text-primary fw-bold'
//               placeholder='search here'
//             ></input> */}
//           </div>
//           <div className='col-2 offset-2'>
//             <PageSelect
//               totalElements={totalElements}
//               setPageSize={setPageSize}
//               setPageNumber={setPageNumber}
//               setTotalpage={setTotalPages}
//               pageSize={pageSize}
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-12'>
//             <Table data={data} 
             
//             Answer={true} answerFun={handleUpdate} />
//           </div>
//         </div>
//       </div>
      
//       {data.length === 0 ? (
//         <div className='text-center fw-bold text-danger fs-1'> No Question Found </div>
//       ) : null}
//     </>
//   );
// };

// export default GetAllQuestions;