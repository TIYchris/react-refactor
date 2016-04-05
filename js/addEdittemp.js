import React from 'react';
export default React.createClass({
	getInitialState: function() {
		return this.props.data;
	},
	titleChange: function(e) {
		this.setState({title: e.target.value});
	},
	urlChange: function(e) {
		this.setState({url: e.target.value});
	},
	descriptionChange: function(e) {
		this.setState({description: e.target.value});
	},
   	render: function(){
       return (
           <form id="detailForm">
               {this.state.objectId ? <input id="objectId" type="hidden" readOnly value={this.state.objectId} /> : ""}
   
	           <div className="form-group">
	               <label >Title</label>
	               <input id="title" type="text" className="form-control" placeholder="Title" onChange={this.titleChange} value={this.state.title} />
	           </div>

	           <div className="form-group">
	               <label >Image URL</label>
	               <input id="url" type="text" className="form-control" placeholder="Image URL" onChange={this.urlChange} value={this.state.url} />
	           </div>

	           <div className="form-group">
	               <label >Description</label>
	               <input id="description" type="text" className="form-control" placeholder="Description" onChange={this.descriptionChange} value={this.state.description} />
	           </div>

	           <button className="btn btn-default" type="submit">Submit</button>
           </form>
       )
   }

})
