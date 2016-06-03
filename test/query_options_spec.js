var QueryOptions = require("../lib/query_options");
var assert = require("assert"),
  util = require("util");

describe("QueryOptions", function () {
  describe("selectList", function () {
    it("should join arrays", function () {
      var result = new QueryOptions({columns: ["col1", "col2"]}, {});
      assert.equal(result.selectList(), "col1,col2");
    });

    it("should leave anything else alone", function () {
      var result = new QueryOptions({columns: "*"}, {});
      assert.equal(result.selectList(), "*");
    });
  });

  describe("queryOptions", function () {
    it("should emit an order by", function () {
      var result = new QueryOptions({}, {});
      assert.equal(result.queryOptions(), " order by 1");
    });

    it("should add an offset", function () {
      var result = new QueryOptions({offset: 10}, {});
      assert.equal(result.queryOptions(), " order by 1 offset 10");
    });

    it("should add a limit", function () {
      var result = new QueryOptions({limit: 10}, {});
      assert.equal(result.queryOptions(), " order by 1 limit 10");
    });

    it("should add both offset and limit", function () {
      var result = new QueryOptions({offset: 10, limit: 10}, {});
      assert.equal(result.queryOptions(), " order by 1 offset 10 limit 10");
    });

    it("should accept an array of sort criteria", function () {
      var result = new QueryOptions({
        order: [
          {field: "col1", direction: "asc"},
          {field: "body->>'col2'", direction: "desc", type: "varchar"},
          {field: "col3 + col4"}
        ]
      }, {});

      assert.equal(result.queryOptions(), " order by col1 asc,(body->>'col2')::varchar desc,col3 + col4 asc");
    });
  });
});
