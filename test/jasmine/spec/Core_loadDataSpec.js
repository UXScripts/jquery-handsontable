describe('Core_loadData', function () {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      this.$container.remove();
    }
  });

  var arrayOfArrays = function () {
    return [
      ["", "Kia", "Nissan", "Toyota", "Honda"],
      ["2008", 10, 11, 12, 13],
      ["2009", 20, 11, 14, 13],
      ["2010", 30, 15, 12, 13]
    ];
  };

  var arrayOfObjects = function () {
    return [
      {id: 1, name: "Ted", lastName: "Right"},
      {id: 2, name: "Frank", lastName: "Honest"},
      {id: 3, name: "Joan", lastName: "Well"},
      {id: 4, name: "Sid", lastName: "Strong"},
      {id: 5, name: "Jane", lastName: "Neat"},
      {id: 6, name: "Chuck", lastName: "Jackson"},
      {id: 7, name: "Meg", lastName: "Jansen"},
      {id: 8, name: "Rob", lastName: "Norris"},
      {id: 9, name: "Sean", lastName: "O'Hara"},
      {id: 10, name: "Eve", lastName: "Branson"}
    ];
  };

  var arrayOfNestedObjects = function () {
    return [
      {id: 1, name: {
        first: "Ted",
        last: "Right"
      }},
      {id: 2, name: {
        first: "Frank",
        last: "Honest"
      }},
      {id: 3, name: {
        first: "Joan",
        last: "Well"
      }}
    ]
  };

  var htmlData = [
    ['<b>H&M</b>']
  ];

  it('should allow array of arrays', function () {
    handsontable();
    loadData(arrayOfArrays());
    expect(getDataAtCell(0, 2)).toEqual("Nissan");
  });

  it('should allow array of objects', function () {
    handsontable({
      columns: [
        {data: "id"},
        {data: "lastName"},
        {data: "name"}
      ]
    });
    loadData(arrayOfObjects());
    expect(getDataAtCell(0, 2)).toEqual("Ted");
  });

  it('should allow array of nested objects', function () {
    handsontable({
      data: arrayOfNestedObjects(),
      colHeaders: true,
      columns: [
        {data: "id"},
        {data: "name.last"},
        {data: "name.first"}
      ]
    });
    expect(getDataAtCell(0, 2)).toEqual("Ted");
  });

  it('should figure out default column names for array of nested objects', function () {
    handsontable({
      data: arrayOfNestedObjects(),
      colHeaders: true
    });
    expect(getDataAtCell(0, 2)).toEqual("Right");
  });

  it('should trigger onChange callback when loaded array of arrays', function () {
    var called = false;

    runs(function () {
      handsontable({
        onChange: function (changes, source) {
          if (source === 'loadData') {
            called = true;
          }
        }
      });
      loadData(arrayOfArrays());
    });

    waitsFor(function () {
      return (called === true)
    }, "onChange callback called", 100);

    runs(function () {
      expect(called).toEqual(true);
    });
  });

  it('should trigger onChange callback when loaded array of objects', function () {
    var called = false;

    runs(function () {
      handsontable({
        onChange: function (changes, source) {
          if (source === 'loadData') {
            called = true;
          }
        }
      });
      loadData(arrayOfObjects());
    });

    waitsFor(function () {
      return (called === true)
    }, "onChange callback called", 100);

    runs(function () {
      expect(called).toEqual(true);
    });
  });

  it('should trigger onChange callback when loaded array of nested objects', function () {
    var called = false;

    runs(function () {
      handsontable({
        onChange: function (changes, source) {
          if (source === 'loadData') {
            called = true;
          }
        }
      });
      loadData(arrayOfNestedObjects());
    });

    waitsFor(function () {
      return (called === true)
    }, "onChange callback called", 100);

    runs(function () {
      expect(called).toEqual(true);
    });
  });

  it('should create new rows for startRows (array of arrays)', function () {
    var called = false;
    var myData = arrayOfArrays();
    var expectedRows = myData.length * 2;

    handsontable({
      startRows: expectedRows,
      data: myData,
      onChange: function (changes, source) {
        if (source === 'loadData') {
          called = true;
        }
      }
    });

    expect(myData.length).toEqual(expectedRows);
  });

  it('should create new rows for startRows (array of nested objects)', function () {
    var called = false;
    var myData = arrayOfNestedObjects();
    var expectedRows = myData.length * 2;

    handsontable({
      startRows: expectedRows,
      data: myData,
      onChange: function (changes, source) {
        if (source === 'loadData') {
          called = true;
        }
      }
    });

    expect(myData.length).toEqual(expectedRows);
  });

  it('HTML special chars should be escaped by default', function () {
    handsontable();
    loadData(htmlData);
    expect(getCell(0, 0).innerHTML).toEqual('&lt;b&gt;H&amp;M&lt;/b&gt;');
  });

  it('HTML special chars should be escaped by default', function () {
    handsontable({
      startRows: 6,
      data: arrayOfObjects()
    });
    expect(getCell(9, 1).innerHTML).toEqual('Eve');
  });
});