export const Alfa = ({ children, className, as: Node = 'h1', ...props }) => (
  <Node
    className={[
      'text-lg font-bold text-white tracking-widest uppercase',
      className
    ].join(' ')}
    {...props}
  >
    {children}
  </Node>
)

export const Bravo = ({ children, className, as: Node = 'h2', ...props }) => (
  <Node
    className={[
      'font-bold text-white tracking-widest uppercase',
      className
    ].join(' ')}
    {...props}
  >
    {children}
  </Node>
)

export const Charlie = ({ children, className, as: Node = 'h3', ...props }) => (
  <Node
    className={[
      'font-bold text-white tracking-widest uppercase',
      className
    ].join(' ')}
    {...props}
  >
    {children}
  </Node>
)
