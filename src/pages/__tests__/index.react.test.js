import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../index'

it('<Home /> renders correctly', () => {
  const index = renderer.create(<Home />).toJSON()
  expect(index).toMatchInlineSnapshot(`
    <div
      className="flex flex-col items-center justify-center"
    >
      <img
        className="max-w-xl w-full"
        src="https://picsum.photos/600/400"
      />
      <h2
        className="bg-yellow-400 font-bold my-8 p-3 text-lg md:text-2xl"
      >
        Hi! Welcome to your first Next.js site.
      </h2>
    </div>
  `)
})
