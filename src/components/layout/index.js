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
    className={['flex flex-wrap -mx-2 lg:-mx-4', className].join(' ')}
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
  <Node className={['flex-none px-2 lg:px-4', className].join(' ')} {...props}>
    {children}
  </Node>
)
