(function(module) {
  var articlesController = {};

  Article.createTable();

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT-DONE: What does this method do?  What is it's execution path?
  // This method attaches an individual article to the ctx referenced by the id,
  // then calls the next function (in this case, articlesController.index
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT-DONE: What does this method do?  What is it's execution path?
  //This method attaches all articles by an author to the ctx object
  //and calls the next function which is articlesController.index.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT-DONE: What does this method do?  What is it's execution path?
  // this method attaches all articles in a category to the context ctx
  // and calls the next function which is articlesController.index.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT-DONE: What does this method do?  What is it's execution path?
  // We are assigning ctx a property articles which contains all articles, and then calling the next function (articlesController.index in this case)
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articlesController = articlesController;
})(window);
