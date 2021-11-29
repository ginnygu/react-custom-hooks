import React from "react";
import { useParams } from "react-router-dom";
function MovieDetail() {
  const params = useParams();

  console.log(params);
  return <div>Movie Detail</div>;
}

export default MovieDetail;
