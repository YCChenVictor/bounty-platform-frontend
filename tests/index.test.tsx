import * as React from 'react';
import TestRenderer from 'react-test-renderer';

it('renders without crashing', () => {
  const testRenderer: TestRenderer.ReactTestRenderer = TestRenderer.create(<h1>Hello World</h1>);
  expect(testRenderer.toJSON()).toMatchSnapshot();
});
