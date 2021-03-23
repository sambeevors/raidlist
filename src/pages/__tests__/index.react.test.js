import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../index'

it('<Home /> renders correctly', () => {
  const index = renderer.create(<Home />).toJSON()
  expect(index).toMatchInlineSnapshot(`
    <p>
      Please log in to continue...
    </p>
  `)
})
