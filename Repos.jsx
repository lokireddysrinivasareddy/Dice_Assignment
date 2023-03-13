import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {
    Form,
    Input,
    Button,
    FormGroup,
    Row,
    Col,
    Alert
} from 'reactstrap';
import CardData from './Cards/CardData';

const RepoData=()=> {
  const [searchItem, setSearchItem] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [sortFilter,setSortFilter]=useState('stars');

  const fetchRepoData = async (searchItem) => {
    try {
      const url = `https://api.github.com/search/repositories?q=${searchItem}&sort=${sortFilter}`;
      const response = await axios.get(url);
      console.log(response.data.items[1].name);
      response.data.items[1].name === "undefined" ? setRepositories([]) : setRepositories(response.data.items);
    } catch (error) {
      console.log(error);
      setRepositories([]);
    }
  };

  useEffect(() => {
    fetchRepoData();
    return () => {}
  }, [sortFilter]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchRepoData(searchItem);
  };

  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };

  const handleFilter=(e)=>{
    const {value}=e.target;
    setSortFilter(value);
  }

  return (
    <div className='my-3'>
      <Form onSubmit={handleSubmit}>
      <Row className='d-flex justify-content-center'>
        <Col xs="5" lg="3" md="3">
        <FormGroup>
        <Input type="text" placeholder="Search for repositories" value={searchItem} onChange={handleChange} />
        </FormGroup>
        </Col>
        <Col xs="4" lg="2" md="2">
        <FormGroup>
          <Input type="select" name="select" onChange={handleFilter}>
        <option value="stars">Stars</option>
        <option value="watchers_count">Watchers</option>
        <option value="score">Score</option>
        <option value="name">Name</option>
        <option value="created_at">Created At</option>
        <option value="updated_at">Updated At</option>
          </Input>
        </FormGroup>
        </Col>
        <Col xs="10" lg="2" md="2">
        <Button type="submit" color='success'>Search</Button>
        </Col>
      </Row>
      </Form>
      <div>
      {repositories.length ? 
        <CardData repositories={repositories} />
        :
        <Alert color="danger" className='text-center'>No Repositories Found!! Search Repository....</Alert> 
      }
      </div>
    </div>
  );
}

export default RepoData;

