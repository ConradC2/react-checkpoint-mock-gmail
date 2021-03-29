//// not fully implemented

var Search = ({ searchMethod }) => (
  <div className="search-bar">
    <input className="form-control" type="text" onChange={searchMethod} />
    <button>
      <span></span>
    </button>
  </div>
);

export default Search;