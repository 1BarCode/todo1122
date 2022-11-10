import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ search, setSearch }) => {
	return (
		<div className="search-container">
			<FontAwesomeIcon icon={faMagnifyingGlass} />
			<input type="search" className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" />
		</div>
	);
};

export default Search;
