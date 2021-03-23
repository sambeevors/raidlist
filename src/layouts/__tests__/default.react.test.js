import React from 'react'
import renderer from 'react-test-renderer'
import Layout from '../default'

it('Default <Layout /> renders correctly', () => {
  const layout = renderer.create(<Layout />).toJSON()
  expect(layout).toMatchInlineSnapshot(`
    <div
      className="flex flex-col min-h-screen"
    >
      <header
        className="bg-purple-500"
      >
        <div
          className="flex flex-wrap md:flex-no-wrap items-center justify-between max-w-4xl mx-auto p-4 md:p-8"
        >
          <div
            className="flex items-center"
          >
            <a
              className="font-bold text-white text-xl"
              href="/"
              onClick={[Function]}
              onMouseEnter={[Function]}
            >
              Next.js + Tailwind
            </a>
          </div>
          <button
            className="flex md:hidden border border-white items-center px-3 py-2 rounded text-white"
            onClick={[Function]}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>
                Menu
              </title>
              <path
                d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
              />
            </svg>
          </button>
          <ul
            className="hidden md:flex flex-col md:flex-row md:items-center md:justify-center text-sm w-full md:w-auto"
          >
            <li
              className="mt-3 md:mt-0 md:ml-6"
            >
              <a
                className="block text-white"
                href="/"
                onClick={[Function]}
                onMouseEnter={[Function]}
              >
                Home
              </a>
            </li>
            <li
              className="mt-3 md:mt-0 md:ml-6"
            >
              <a
                className="block text-white"
                href="/about"
                onClick={[Function]}
                onMouseEnter={[Function]}
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </header>
      <main
        className="flex-1 w-full max-w-4xl p-4 mx-auto md:px-8 md:py-16"
      />
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
    </div>
  `)
})
