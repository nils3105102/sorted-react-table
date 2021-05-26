import React, { useMemo } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination/Pagination.jsx";
import Table from "./Table/Table.jsx";

const App = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const DATA_LIMIT = 50;
  
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const result = await axios.get("https://jsonplaceholder.typicode.com/comments");
            setComments(result.data);
        } catch(err) {
            setError(err.message);
        }
    };

    fetchUsers();
  }, []);

  const sortData = (value) => {
    setOrder(order === false ? true : false);
    setSearch("");
    setCurrentPage(1);
    
    if (order) {
      const sortedComments = [...comments].sort((a, b) => {
        return b[value] > a[value] ? 1 : -1;
      });
      
      setComments(sortedComments);
    } else {
      const sortedComments = [...comments].sort((a, b) => {
        return b[value] < a[value] ? 1 : -1;
      });

      setComments(sortedComments);
    }
  };

  const getPaginatedData = useMemo(() => {
    let computedComments = [...comments];
    const startIndex = currentPage * DATA_LIMIT - DATA_LIMIT;
    const endIndex = startIndex + DATA_LIMIT;

    if (search) {
      computedComments = computedComments.filter(comment => {
        return (
          comment.name.toLowerCase().includes(search.toLowerCase().trim()) ||
          comment.body.toLowerCase().includes(search.toLowerCase().trim()) ||
          comment.email.toLowerCase().includes(search.toLowerCase().trim())
        );
      });
    } 

    setTotalItems(computedComments.length);

    return computedComments.slice(startIndex, endIndex);
  }, [comments, currentPage, search])

  if (comments && !comments.length && !error) {
    return <div>...Loading</div>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className="app">
        <input maxLength="200" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Фильтр"/>
        <Table comments={getPaginatedData} sortData={sortData}/>
        {
          totalItems > 0 
          ? <Pagination 
              total={totalItems} 
              dataLimit={DATA_LIMIT} 
              currentPage={currentPage}
              onPageChange={ page => setCurrentPage(page)}
            /> 
          : null
        }
    </div>
  );
}

export default App;
