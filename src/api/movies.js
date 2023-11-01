import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmY5MTZhZjVhODBkMzZkZmQxZjI1ZWFkZjFhZGE2MCIsInN1YiI6IjYxZWQ5OGExNGE0YmZjMDA5MGFjYTVhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.adwvvrWHhNeMmt-YwaTBZSu_4YSiAFKbgwBgJoFuAxw          ` 
  }
});