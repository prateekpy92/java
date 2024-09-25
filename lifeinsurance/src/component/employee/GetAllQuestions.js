import React, { useEffect, useState } from 'react';
import { getAllQuestions } from '../../services/employee/Employee';
import Table from '../shared/table/Table';
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import AddAnswer from './AddAnswer';
import axios from 'axios';


const GetAllQuestions = () => {
  
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [data, setData] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const getAllQuestionsData = async () => {
    try {
      let response = await getAllQuestions(pageNumber, pageSize);
      setData(response.data.content);
      setTotalPages(Math.ceil(parseInt(response.headers['question-count']) / pageSize));
      setTotalElements(parseInt(response.headers['question-count']));
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
  };

  useEffect(() => {
    getAllQuestionsData();
  }, [pageNumber, pageSize]);

  return (
    <>
      {showAnswerForm && (
        <AddAnswer questionId={selectedQuestionId} handleCloseForm={handleCloseForm} />
      )}
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
          <div className='col-2 offset-2'>
            <PageSizeSetter
              totalElements={totalElements}
              setPageSize={setPageSize}
              setTotalpage={setTotalPages}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Table data={data} Answer={true} answerFun={handleUpdate} />
          </div>
        </div>
      </div>
      {data.length === 0 && (
        <div className='text-center fw-bold text-danger fs-1'>No Question Found</div>
      )}
    </>
  );
};

export default GetAllQuestions;
