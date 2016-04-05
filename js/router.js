import React from 'react';
import ReactDOM from 'react-dom';
import Maintemp from './maintemp.js';
import Detailtemp from './detailtemp.js';
import AddEdittemp from './AddEdittemp.js';


var Backbone = require('./lib/backbone-parse/backbone-parse');
var Post = require('./models/post');
var Posts = require('./collections/posts');
var mainTemplate = require('./templates/main.html');
var detailTemplate = require('./templates/detail.html');
var addEditTemplate = require('./templates/addEdit.html');

var Router = Backbone.Router.extend({
  initialize: function () {
    Backbone.history.start({pushState: true});
  },
  routes: {
    "detail/:objectId": "post",
    "post/add": "add",
    "post/:objectId/edit": "edit",
    "":"index"
  },
  index: function () {
    Posts.fetch({
      success: function (posts) {
        ReactDOM.render(<Maintemp data={posts.toJSON()} />,
          document.getElementById('container'))
        }
    });
  }
});

var router = new Router();

router.on('route:post', function (objectId) {
  var post = Posts.get(objectId);
  ReactDOM.render(<Detailtemp data={post.toJSON()} />,
    document.getElementById('container'))
}); 

router.on('route:add', function () {
  ReactDOM.render(<AddEdittemp data={{}}/>,
    document.getElementById('container')
    )
});

router.on('route:edit', function (objectId) {
  var post = Posts.get(objectId);
  ReactDOM.render(<AddEdittemp data={post.toJSON()} />,
    document.getElementById('container')
  )
});

$('body').on('click', 'a', function (e){
  e.preventDefault();
  var href = $(this).attr('href').substr(1);
  router.navigate(href, {trigger:true});
});

$('#addBtn').on('click', function (e) {
  e.preventDefault();
  router.navigate('post/add', {trigger:true});
});


$("body").on('submit', "#detailForm", function (e) {
  e.preventDefault();
  var post = new Post();
  if ($("#objectId").length) {
    post.set("objectId", $("#objectId").val());
  }
  if ($("#title").length) {
    post.set("title", $("#title").val());
  }
  if ($("#url").length) {
    post.set("url", $("#url").val());
  }
  if ($("#description").length) {
    post.set("description", $("#description").val());
  }
  post.save({}, {
    success: function (rsp) {
      router.navigate("/", {trigger: true});
    }
  })
});

module.exports = router;