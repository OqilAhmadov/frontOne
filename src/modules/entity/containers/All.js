import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "recompose";
import isEqual from "lodash/isEqual";
import PropTypes from "prop-types";
import qs from "qs";

import { withRouter } from "utils";
import Actions from "../actions";
import Selectors from "../selectors";

export class All extends Component {
	static propTypes = {
		entity: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		url: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
		params: PropTypes.object,
		dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		metaKey: PropTypes.string,
		appendData: PropTypes.bool,
		prependData: PropTypes.bool,
		initialLoad: PropTypes.bool,
		primaryKey: PropTypes.string,
		relations: PropTypes.object,
		infiniteScroll: PropTypes.bool,
		onSuccess: PropTypes.func
	};

	static defaultProps = {
		isFetched: true,
		dataKey: "data",
		metaKey: "_meta",
		appendData: false,
		prependData: false,
		initialLoad: true,
		primaryKey: "id",
		infiniteScroll: false,
		onSuccess: () => {}
	};

	componentDidMount() {
		const {
			entity,
			name,
			url,
			params,
			dataKey,
			metaKey,
			appendData,
			prependData,
			initialLoad,
			primaryKey,
			relations,
			infiniteScroll,
			onSuccess
		} = this.props;
		if (initialLoad) {
			this.Load(entity, name, url, params, dataKey, metaKey, appendData, prependData, primaryKey, relations, infiniteScroll, onSuccess);
		}
	}

	componentDidUpdate(prevProps) {
		const { entity, name, url, params, dataKey, metaKey, appendData, prependData, primaryKey, relations, infiniteScroll, onSuccess } = this.props;
		if (!isEqual(url, prevProps.url) || !isEqual(params, prevProps.params) || !isEqual(name, prevProps.name)) {
			this.Load(entity, name, url, params, dataKey, metaKey, appendData, prependData, primaryKey, relations, infiniteScroll, onSuccess);
		}
	}

	Load = (
		entity,
		name,
		url,
		{ page = 1, limit = 20, sort = "-id", fields = [], include = [], filter = {}, extra = {} } = {},
		dataKey,
		metaKey,
		appendData,
		prependData,
		primaryKey,
		relations,
		infiniteScroll,
		onSuccess
	) => {
		const { LoadAll } = this.props;

		console.log('action request')
		LoadAll({
			entity,
			name,
			url,
			params: { page, limit, sort, fields, include, filter, extra },
			dataKey,
			metaKey,
			appendData,
			prependData,
			primaryKey,
			relations,
			infiniteScroll,
			onSuccess
		});
	};

	setParams = (params = {}, clearOthers = false) => {
		const { navigate, location } = this.props;
		const query = !clearOthers ? qs.parse(location.search, { ignoreQueryPrefix: true }) : {};
		navigate({
			search: qs.stringify({ ...query, ...params })
		});
	};

	render() {
		const { items, isFetched, meta, children } = this.props;
		return children({
			items,
			meta,
			isFetched,
			setParams: this.setParams
		});
	}
}

const mapStateToProps = () => {
	const getAll = Selectors.getAll();
	return (state, props) => {
		const { items, isFetched, meta } = getAll(state, props);
		return { items, isFetched, meta };
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			LoadAll: Actions.LoadAll.request
		},
		dispatch
	);

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(All);
