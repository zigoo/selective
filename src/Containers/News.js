import React from 'react';
import News from "../Components/News.js";
import { fetchNews } from "../Redux/actions.js";
import { connect } from "react-redux";
import { branch, compose, lifecycle, renderComponent } from "recompose";

const identity = f => f;
const Spinner = () => <div> Loading </div>;

const branched = branch(
	props => props.isLoaded,
	identity,
	renderComponent(Spinner)
);

export default compose(
	connect(
		state => ({
			news: state.news,
			isLoaded: state.isLoaded
		}),
		{ fetchNews }
	),
	lifecycle({
		componentDidMount() {
			this.props.fetchNews();
		}
	}),
	branched
)(News);
