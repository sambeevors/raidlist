import React from 'react'
import renderer from 'react-test-renderer'
import Footer from '../Footer'

it('<Footer /> renders correctly', () => {
  const footer = renderer.create(<Footer />).toJSON()
  expect(footer).toMatchInlineSnapshot(`
    <footer
      className="bg-purple-500"
    >
      <ul
        className="flex items-center justify-between max-w-4xl mx-auto p-4 md:p-8 text-sm text-white"
      >
        <li>
          Created by
           
          <a
            className="font-bold"
            href="https://sambeevors.com"
            target="_blank"
          >
            Sam Beevors
          </a>
        </li>
      </ul>
    </footer>
  `)
})
