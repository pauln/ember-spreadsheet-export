import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | csv', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('#jsonToCsv - with valid Array of Arrays, it should return an string with CSV format', function(assert) {
    const service = this.owner.lookup('service:csv');
    const array = [
      [
        'name',
        'last_name',
      ],
      [
        'Dale',
        'Cooper'
      ],
    ];
    const expectedCSV = '"name","last_name"\r\n"Dale","Cooper"\r\n';
    const options = {
      separator: ',',
      withSeparator: false,
      wrapWithQuotes: true,
    };

    assert.deepEqual(service.jsonToCsv(array, options), expectedCSV);
  });

  test('#jsonToCsv - with quote wrapping off, it should return a string in CSV format without quotes', function(assert) {
    const service = this.owner.lookup('service:csv');
    const array = [
      [
        'name',
        'last_name',
      ],
      [
        'Dale',
        'Cooper'
      ],
    ];
    const expectedCSV = 'name,last_name\r\nDale,Cooper\r\n';
    const options = {
      separator: ',',
      withSeparator: false,
      wrapWithQuotes: false,
    };

    assert.deepEqual(service.jsonToCsv(array, options), expectedCSV);
  });
});
