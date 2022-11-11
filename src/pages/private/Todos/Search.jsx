import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ query, setQuery }) => {
	return (
		<div className="search-container">
			<FontAwesomeIcon icon={faMagnifyingGlass} />
			<input type="search" className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search" />
		</div>
	);
};

export default Search;
