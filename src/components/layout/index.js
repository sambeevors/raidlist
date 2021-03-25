export const Container = ({
  children,
  className = '',
  as: Node = 'div',
  ...props
}) => (
  <Node className={['container', className].join(' ')} {...props}>
    {children}
  </Node>
)

export const Row = ({
  children,
  className = '',
  as: Node = 'div',
  ...props
}) => (
  <Node
    className={['flex flex-wrap -mx-4 lg:-mx-8', className].join(' ')}
    {...props}
  >
    {children}
  </Node>
)

export const Col = ({
  children,
  className = '',
  as: Node = 'div',
  ...props
}) => (
  <Node className={['flex-none px-4 lg:px-8', className].join(' ')} {...props}>
    {children}
  </Node>
)
